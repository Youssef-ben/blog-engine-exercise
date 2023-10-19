import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Post } from '../../../../../models/post';
import { ApiResponse, Pagination } from '../../../../../models/response';
import { PostItemProps, PostsListProps } from '../../../../../views/post';
import { UpdateNotifier } from '../../../../utils/UpdateNotifier';
import { API_URL } from '../../../../utils/constants';
import { getErrorMessage } from '../../../../utils/responseHelpers';
import { PostFormContainerProps } from '../postFormContainer/PostFormContainer';

export interface UsePostPageContentDate {
  isLoading: boolean;
  postsListProps: PostsListProps;
  postFormProps: PostFormContainerProps;
}

export const usePostPageContent = (): UsePostPageContentDate => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postId, setPostId] = useState<string | undefined>();
  const [posts, setPosts] = useState<Pagination<Post>>();

  const fetchPosts = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios<ApiResponse<Pagination<Post>>>({
        method: 'GET',
        url: `${API_URL}/posts/admin?recordsPerPage=100`,
      });

      if (data) {
        setPosts(data.results);
      }
    } catch (error: any) {
      console.error(t(getErrorMessage(error)));
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();

    /**
     * This normally should be a websocket connection with the web api
     * But for the purpose of this exercise we added a little pub/sub handler.
     */
    UpdateNotifier.subscribe('posts', async () => {
      await fetchPosts();
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

  return {
    isLoading,
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
