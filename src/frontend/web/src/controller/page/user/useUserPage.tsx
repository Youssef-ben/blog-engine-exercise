import { useCategoryService } from 'Controller/service/categoryService';
import { UpdateNotifier } from 'Controller/utils';
import { Category, CategoryPosts } from 'Models/category';
import { EMPTY_PAGINATION_VALUES, Pagination } from 'Models/response';
import { PostCardProps } from 'Views/post';
import { PostCardListProps } from 'Views/post/postCardList';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PostCategoryOption, UserPageHeaderProps } from './userPageHeader/UserPageHeader';

export interface UseUserPageData {
  isLoading: boolean;
  userPageHeaderProps: UserPageHeaderProps;
  postCardListProps: PostCardListProps;
}

export const useUserPage = (): UseUserPageData => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { fetchCategoriesAsync, searchCategoryPostsAsync } = useCategoryService();

  const [keyword, setKeyword] = useState<string>('');
  const [category, setCategory] = useState<Category>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Pagination<Category>>(EMPTY_PAGINATION_VALUES);
  const [categoryPosts, setCategoryPosts] = useState<CategoryPosts>();

  useEffect(() => {
    getCategoriesAsync();

    /**
     * This normally should be a websocket connection with the web api
     * But for the purpose of this exercise we added a little pub/sub handler.
     */
    UpdateNotifier.subscribe('categories', async () => {
      await getCategoriesAsync();
    });
  }, []);

  useEffect(() => {
    if (category) {
      fetchCategoryPostsAsync('');
    }
  }, [category]);

  const getCategoriesAsync = async () => {
    setIsLoading(true);

    const result = await fetchCategoriesAsync();
    setCategories(result);

    if (!category && result.totalRecords > 0) {
      setCategory(result.records[0]);
    }

    setIsLoading(false);
    return result;
  };

  const fetchCategoryPostsAsync = async (keyword: string) => {
    setIsLoading(true);
    if (!category) {
      setIsLoading(false);
      setCategoryPosts({
        id: '',
        title: '',
        posts: EMPTY_PAGINATION_VALUES,
      });
      return;
    }

    const data = await searchCategoryPostsAsync(category.id, keyword);
    setCategoryPosts(data);

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

  const getCategoriesOptions = (): PostCategoryOption[] => {
    return categories.records.map((category) => {
      return {
        value: category.id,
        label: category.title,
      };
    });
  };

  const getSelectedCategoryOption = (): PostCategoryOption | undefined => {
    if (category) {
      return {
        value: category.id,
        label: category.title,
      };
    }
    return undefined;
  };

  const debouncedSearch = debounce(async (keyword: string) => {
    await fetchCategoryPostsAsync(keyword);
  }, 300);

  return {
    isLoading,
    userPageHeaderProps: {
      categorySelectorProps: {
        selected: getSelectedCategoryOption(),
        categories: getCategoriesOptions(),
        onChange: (option: PostCategoryOption) => {
          setCategory({
            id: option.value,
            title: option.label,
          });
          setKeyword('');
        },
      },
      searchProps: {
        value: keyword,
        placeholder: t('post.list.search'),
        onChange: (event) => {
          debouncedSearch(event.target.value);
          setKeyword(event.target.value);
        },
      },
    },
    postCardListProps: {
      posts: getPostsList(),
      onClick: (id: string) => {
        navigate(`/${id}`);
      },
    },
  };
};
