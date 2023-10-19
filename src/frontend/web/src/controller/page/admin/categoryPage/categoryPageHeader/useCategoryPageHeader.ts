import { useState } from 'react';
import { CategoryFormContainerProps } from '../categoryFormContainer';

export interface UseCategoryPageHeaderData {
  handleOpenModal: () => void;
  postFormProps: CategoryFormContainerProps;
}

export const useCategoryPageHeader = (): UseCategoryPageHeaderData => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return {
    handleOpenModal,
    postFormProps: {
      isModalOpen: isModalOpen,
      handleIsModalOpen: handleOpenModal,
    },
  };
};
