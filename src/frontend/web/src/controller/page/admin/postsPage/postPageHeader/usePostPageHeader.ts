import { useState } from 'react';
import { PostFormContainerProps } from '../postFormContainer/PostFormContainer';

export interface UsePostPageHeaderData {
  handleOpenModal: () => void;
  postFormProps: PostFormContainerProps;
}

export const usePostPageHeader = (): UsePostPageHeaderData => {
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
