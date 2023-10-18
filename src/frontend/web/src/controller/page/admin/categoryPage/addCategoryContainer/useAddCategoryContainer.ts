import axios from 'axios';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Category } from '../../../../../models/categoryDto';
import { ApiResponse } from '../../../../../models/response';
import { CategoryModalError, CategoryModalProps } from '../../../../../views/category';
import { UpdateNotifier } from '../../../../utils/UpdateNotifier';
import { API_URL } from '../../../../utils/constants';
import { getErrorMessage } from '../../../../utils/responseHelpers';

export interface UseAddCategoryContainerData {
  handleOpenModal: () => void;
  categoryModal: CategoryModalProps;
}

export interface AddCategoryForm {
  title: string;
}

export const useAddCategoryContainer = (): UseAddCategoryContainerData => {
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState('');
  const [error, setError] = useState<CategoryModalError>();

  const handleAddCategory = async () => {
    setIsLoading(true);

    if (!categoryTitle) {
      setError({ message: t('category.form.error.titleRequired') });
      setIsLoading(false);
      return;
    }

    try {
      await axios<ApiResponse<Category>>({
        method: 'POST',
        url: `${API_URL}/categories/admin`,
        data: {
          title: categoryTitle,
        },
      });

      setIsModalOpen(false);
      setCategoryTitle('');
      setError(undefined);

      UpdateNotifier.notify('category');
    } catch (error: any) {
      setError({
        message: t(getErrorMessage(error)),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
    setCategoryTitle('');
    setError(undefined);
    setIsLoading(false);
  };

  return {
    handleOpenModal,
    categoryModal: {
      error,
      value: categoryTitle,
      isOpen: isModalOpen,
      isLoading: isLoading,
      modalTitle: t('category.form.add'),
      primaryButtonLabel: t('common.save'),
      onValueChanged: (value) => {
        setCategoryTitle(value);
      },
      onPrimaryButtonClick: handleAddCategory,
      onSecondaryButtonClick: handleOpenModal,
    },
  };
};
