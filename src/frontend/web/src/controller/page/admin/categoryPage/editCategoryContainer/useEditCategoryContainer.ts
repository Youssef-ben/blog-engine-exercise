import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Category } from '../../../../../models/category';
import { ApiResponse, Pagination } from '../../../../../models/response';
import { CategoriesListProps, CategoryModalError, CategoryModalProps } from '../../../../../views/category';
import { UpdateNotifier } from '../../../../utils/UpdateNotifier';
import { API_URL } from '../../../../utils/constants';
import { getErrorMessage } from '../../../../utils/responseHelpers';

export interface UseEditCategoryContainerData {
  categoriesListProps: CategoriesListProps;
  categoryModal: CategoryModalProps;
}

export const useEditCategoryContainer = (): UseEditCategoryContainerData => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category>();
  const [refetch, setRefetch] = useState<Date>();
  const [categories, setCategories] = useState<Pagination<Category>>();
  const [error, setError] = useState<CategoryModalError>();

  const fetchCategories = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios<ApiResponse<Pagination<Category>>>({
        method: 'GET',
        url: `${API_URL}/categories`,
      });

      if (data) {
        setCategories(data.results);
      }
    } catch (error: any) {
      console.error(t(getErrorMessage(error)));
    }

    setIsLoading(false);
  };

  const handleOnPrimaryClick = async () => {
    setIsLoading(true);

    if (!currentCategory || !currentCategory.title) {
      setError({ message: t('category.form.error.titleRequired') });
      setIsLoading(false);
      return;
    }

    try {
      await axios<ApiResponse<Category>>({
        method: 'PUT',
        url: `${API_URL}/categories/admin`,
        data: currentCategory,
      });

      setIsModalOpen(false);
      setCurrentCategory(undefined);
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

  const onEditCategoryClick = (id: string) => {
    const category = categories?.records.find((c) => c.id === id);

    if (category) {
      handleOpenModal();
      setCurrentCategory(category);
    }
  };

  useEffect(() => {
    fetchCategories();

    /**
     * This normally should a websocket connection with the web api
     * But for the purpose of this exercise we add little pub/sub event
     */
    UpdateNotifier.subscribe('category', () => {
      setRefetch(new Date());
    });
  }, []);

  useEffect(() => {
    if (refetch) {
      fetchCategories();
      setRefetch(undefined);
    }
  }, [refetch]);

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
    setCurrentCategory(undefined);
    setError(undefined);
  };

  return {
    categoriesListProps: {
      categories: categories,
      onClick: onEditCategoryClick,
    },
    categoryModal: {
      error,
      isOpen: isModalOpen,
      modalTitle: t('category.form.edit'),
      value: currentCategory?.title || '',
      isLoading: isLoading,
      primaryButtonLabel: t('common.edit'),
      onValueChanged: (value) => {
        setCurrentCategory((current) => ({
          id: current?.id || '',
          title: value,
        }));
      },
      onPrimaryButtonClick: handleOnPrimaryClick,
      onSecondaryButtonClick: handleOpenModal,
    },
  };
};
