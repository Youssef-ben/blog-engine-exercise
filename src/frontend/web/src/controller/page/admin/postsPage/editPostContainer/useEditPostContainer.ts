import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PostItemProps } from '../../../../../views/post';
import { PostModalProps } from '../../../../../views/post/postModal';

export interface EditPostContainerDate {
  posts: PostItemProps[];
  postModal: PostModalProps;
}

export const useEditPostContainer = (): EditPostContainerDate => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<PostItemProps>();
  const [posts, setPosts] = useState<PostItemProps[]>([]);

  useEffect(() => {
    var posts: PostItemProps[] = [
      {
        id: 'uuid-1',
        title: 'Post 1',
        publicationDate: '2023-01-01',
      },
      {
        id: 'uuid-2',
        title: 'Post 2',
        publicationDate: '2023-02-02',
      },
    ];

    setPosts(posts);
  }, []);

  const onEditPostClick = (id: string) => {
    const post = posts.find((c) => c.id === id);
    console.log(posts);
    if (post) {
      handleOpenModal();
      setCurrentPost(post);
    }
  };

  const handlePrimaryButtonClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      // TODO: Remove the timeout
      setIsLoading(false);
      setIsModalOpen(false);
    }, 1000);
  };

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getPosts = () => {
    return posts.map((c) => {
      return {
        ...c,
        onClick: onEditPostClick,
      };
    });
  };

  return {
    posts: getPosts(),
    postModal: {
      title: '',
      content: '',
      publicationDate: new Date(),
      isOpen: isModalOpen,
      isLoading: isLoading,
      postCategories: {
        categories: [],
      },
      onDateChange: () => {},
      modalTitle: t('post.form.edit'),
      primaryButtonLabel: t('common.edit'),
      onPrimaryButtonClick: handlePrimaryButtonClick,
      onSecondaryButtonClick: handleOpenModal,
    },
  };
};
