import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PostModalProps } from '../../../../../views/post/postModal';

export interface UseAddPostContainerData {
  handleOpenModal: () => void;
  postModal: PostModalProps;
}

export const useAddPostContainer = (): UseAddPostContainerData => {
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  return {
    handleOpenModal,
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
      modalTitle: t('post.form.add'),
      primaryButtonLabel: t('common.save'),
      onPrimaryButtonClick: handlePrimaryButtonClick,
      onSecondaryButtonClick: handleOpenModal,
    },
  };
};
