import { usePostService } from 'Controller/service/postService';
import { UpdateNotifier } from 'Controller/utils/UpdateNotifier';
import { Post } from 'Models/post';
import { Pagination } from 'Models/response';
import { PostItemProps, PostsListProps } from 'Views/post';
import { SearchBarProps } from 'Views/shared';
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

  const { fetchPostsAsync } = usePostService();

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postId, setPostId] = useState<string | undefined>();
  const [posts, setPosts] = useState<Pagination<Post>>();

  const getPostsAsync = async (keyword?: string) => {
    setIsLoading(true);
    const result = await fetchPostsAsync(keyword);
    setPosts(result);

    setIsLoading(false);
  };

  useEffect(() => {
    getPostsAsync();

    /**
     * This normally should be a websocket connection with the web api
     * But for the purpose of this exercise we added a little pub/sub handler.
     */
    UpdateNotifier.subscribe('posts', async () => {
      await getPostsAsync();
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
    await getPostsAsync(keyword);
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
