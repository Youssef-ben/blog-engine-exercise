import { UpdateNotifier } from 'Controller/utils/UpdateNotifier';
import { API_URL } from 'Controller/utils/constants';
import { getErrorMessage } from 'Controller/utils/responseHelpers';
import { Post } from 'Models/post';
import { ApiResponse, EMPTY_PAGINATION_VALUES, Pagination } from 'Models/response';
import { PostItemProps, PostsListProps } from 'Views/post';
import { SearchBarProps } from 'Views/shared';
import axios from 'axios';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PostFormContainerProps } from '../postFormContainer/PostFormContainer';

export interface UsePostPageContentDate {
  isLoading: boolean;
  postsListProps: PostsListProps;
  postFormProps: PostFormContainerProps;
  searchProps: SearchBarProps;
}

export const usePostPageContent = (): UsePostPageContentDate => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postId, setPostId] = useState<string | undefined>();
  const [posts, setPosts] = useState<Pagination<Post>>();

  const fetchPostsAsync = async (keyword?: string) => {
    setIsLoading(true);

    try {
      const { data, status } = await axios<ApiResponse<Pagination<Post>>>({
        method: 'GET',
        url: `${API_URL}/posts/admin?pageNumber=1&recordsPerPage=100&keyword=*${keyword || ''}*`,
      });

      if (status === 204) {
        setPosts(EMPTY_PAGINATION_VALUES);
      }

      if (data) {
        setPosts(data.results);
      }
    } catch (error: any) {
      console.error(t(getErrorMessage(error)));
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchPostsAsync();

    /**
     * This normally should be a websocket connection with the web api
     * But for the purpose of this exercise we added a little pub/sub handler.
     */
    UpdateNotifier.subscribe('posts', async () => {
      await fetchPostsAsync();
    });
  }, []);

  const onPostClick = (id: string) => {
    const post = posts?.records.find((c) => c.id === id);
    if (post) {
      setPostId(post.id);
      handleOpenModal();
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);

    if (isModalOpen) {
      setPostId(undefined);
    }
  };

  const getPostsList = (): PostItemProps[] => {
    if (!posts || posts.totalRecords === 0) {
      return [];
    }

    return posts?.records.map(({ id, title, publicationDate, category }) => {
      return {
        id: id || '',
        title,
        categoryTitle: category?.title || '',
        publicationDate: publicationDate,
      };
    });
  };

  const debouncedSearch = debounce(async (keyword: string) => {
    await fetchPostsAsync(keyword);
  }, 300);

  return {
    isLoading,
    searchProps: {
      placeholder: t('post.list.search'),
      onChange: (event) => {
        debouncedSearch(event.target.value);
      },
    },
    postsListProps: {
      posts: getPostsList(),
      onPostClick: onPostClick,
    },
    postFormProps: {
      postId,
      isModalOpen: isModalOpen,
      handleIsModalOpen: handleOpenModal,
    },
  };
};
