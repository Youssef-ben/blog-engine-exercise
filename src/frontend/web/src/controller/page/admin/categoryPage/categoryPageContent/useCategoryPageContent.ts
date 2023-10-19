import { UpdateNotifier } from 'Controller/utils/UpdateNotifier';
import { API_URL } from 'Controller/utils/constants';
import { getErrorMessage } from 'Controller/utils/responseHelpers';
import { Category } from 'Models/category';
import { ApiResponse, Pagination } from 'Models/response';
import { CategoriesListProps, CategoryItemProps } from 'Views/category';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryFormContainerProps } from '../categoryFormContainer';

export interface UseCategoryPageContentData {
  isLoading: boolean;
  categoriesListProps: CategoriesListProps;
  categoryFormProps: CategoryFormContainerProps;
}

export const useCategoryPageContent = (): UseCategoryPageContentData => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [categories, setCategories] = useState<Pagination<Category>>();

  useEffect(() => {
    fetchCategoriesAsync();

    /**
     * This normally should be a websocket connection with the web api
     * But for the purpose of this exercise we added a little pub/sub handler.
     */
    UpdateNotifier.subscribe('categories', async () => {
      await fetchCategoriesAsync();
    });
  }, []);

  const fetchCategoriesAsync = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios<ApiResponse<Pagination<Category>>>({
        method: 'GET',
        url: `${API_URL}/categories?recordsPerPage=100`,
      });

      if (data) {
        setCategories(data.results);
      }
    } catch (error: any) {
      console.error(t(getErrorMessage(error)));
    }

    setIsLoading(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);

    if (isModalOpen) {
      setCategoryId(undefined);
    }
  };

  const onCategoryClick = (id: string) => {
    const category = categories?.records.find((c) => c.id === id);
    if (category) {
      setCategoryId(category.id);
      handleOpenModal();
    }
  };

  const getCategoriesList = (): CategoryItemProps[] => {
    if (!categories || categories.totalRecords === 0) {
      return [];
    }

    return categories?.records.map(({ id, title }) => {
      return {
        id: id,
        title,
      };
    });
  };

  return {
    isLoading,
    categoryFormProps: {
      categoryId,
      isModalOpen,
      handleIsModalOpen: handleOpenModal,
    },
    categoriesListProps: {
      categories: getCategoriesList(),
      onCategoryClick: onCategoryClick,
    },
  };
};
