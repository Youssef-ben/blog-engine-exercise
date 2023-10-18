import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryModalProps } from '../../../../../views/category';

export interface UseAddCategoryContainerData {
  handleOpenModal: () => void;
  categoryModal: CategoryModalProps;
}

export const useAddCategoryContainer = (): UseAddCategoryContainerData => {
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCategory = () => {
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
    categoryModal: {
      value: '',
      isOpen: isModalOpen,
      isLoading: isLoading,
      modalTitle: t('category.form.add'),
      primaryButtonLabel: t('common.save'),
      onPrimaryButtonClick: handleAddCategory,
      onSecondaryButtonClick: handleOpenModal,
    },
  };
};
