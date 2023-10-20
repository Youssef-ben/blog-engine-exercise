import { useErrorsContext } from 'Controller/provider';
import { fetchCategoriesAsync } from 'Controller/service/categoryService';
import { UpdateNotifier } from 'Controller/utils/UpdateNotifier';
import { API_URL } from 'Controller/utils/constants';
import { getErrorMessage } from 'Controller/utils/responseHelpers';
import { CategoryPosts } from 'Models/category';
import { ApiResponse, EMPTY_PAGINATION_VALUES } from 'Models/response';
import { PostCardProps } from 'Views/post';
import { PostCardListProps } from 'Views/post/postCardList';
import axios from 'axios';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PostCategoryOption, UserPageHeaderProps } from './userPageHeader/UserPageHeader';

export interface UseUserPageData {
  isLoading: boolean;
  userPageHeaderProps: UserPageHeaderProps;
  postCardListProps: PostCardListProps;
}

export const useUserPage = (): UseUserPageData => {
  const { t } = useTranslation();

  const { setMessage } = useErrorsContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoryOption, setCategoryOption] = useState<PostCategoryOption>();
  const [categoryOptions, setCategoryOptions] = useState<PostCategoryOption[]>([]);
  const [categoryPosts, setCategoryPosts] = useState<CategoryPosts>();

  useEffect(() => {
    getCategoriesAsync().then((data) => {
      if (data && data.length > 0) {
        setCategoryOption(data[0]);
      }
    });

    /**
     * This normally should be a websocket connection with the web api
     * But for the purpose of this exercise we added a little pub/sub handler.
     */
    UpdateNotifier.subscribe('categories', async () => {
      await getCategoriesAsync();
    });
  }, []);

  useEffect(() => {
    if (categoryOption) {
      console.log('Fetch the category posts', categoryOption.label);
      fetchCategoryPostsAsync('');
    }
  }, [categoryOption]);

  const getCategoriesAsync = async () => {
    setIsLoading(true);

    const result = await fetchCategoriesAsync();
    setCategoryOptions(result);

    setIsLoading(false);

    return result;
  };

  const fetchCategoryPostsAsync = async (keyword: string) => {
    setIsLoading(true);

    try {
      const { data, status } = await axios<ApiResponse<CategoryPosts>>({
        method: 'GET',
        url: `${API_URL}/categories/${
          categoryOption?.value
        }/posts?pageNumber=1&recordsPerPage=100&keyword=*${keyword || ''}*`,
      });

      if (status === 204) {
        setCategoryPosts({
          id: categoryOption?.value || '',
          title: categoryOption?.label || '',
          posts: EMPTY_PAGINATION_VALUES,
        });
      }

      if (data) {
        setCategoryPosts(data.results);
      }
    } catch (error: any) {
      console.error(t(getErrorMessage(error)));
      setMessage(t(getErrorMessage(error)));
    }

    setIsLoading(false);
  };

  const getPostsList = (): PostCardProps[] => {
    if (!categoryPosts || !categoryPosts?.posts || categoryPosts.posts.totalRecords === 0) {
      return [];
    }

    const { posts } = categoryPosts;

    return posts.records.map(({ id, title, content, category, publicationDate }) => {
      return {
        id: id || '',
        title: title,
        category: category?.title || '',
        content: content,
        publicationDate: publicationDate,
      };
    });
  };

  const debouncedSearch = debounce(async (keyword: string) => {
    await fetchCategoryPostsAsync(keyword);
  }, 300);

  return {
    isLoading,

    userPageHeaderProps: {
      categorySelectorProps: {
        selected: categoryOption,
        categories: categoryOptions,
        onChange: (option: PostCategoryOption) => {
          setCategoryOption(option);
        },
      },
      searchProps: {
        placeholder: t('post.list.search'),
        onChange: (event) => {
          debouncedSearch(event.target.value);
        },
      },
    },
    postCardListProps: {
      posts: getPostsList(),
      onClick: (id: string) => {},
    },
  };
};
