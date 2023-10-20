import { UpdateNotifier } from 'Controller/utils/UpdateNotifier';
import { API_URL } from 'Controller/utils/constants';
import { getErrorMessage } from 'Controller/utils/responseHelpers';
import { Category } from 'Models/category';
import { ApiResponse, EMPTY_PAGINATION_VALUES, Pagination } from 'Models/response';
import { CategoriesListProps, CategoryItemProps } from 'Views/category';
import { SearchBarProps } from 'Views/shared';
import axios from 'axios';
import { debounce } from 'lodash';
import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryFormContainerProps } from '../categoryFormContainer';

export interface UseCategoryPageContentData {
  isLoading: boolean;
  categoriesListProps: CategoriesListProps;
  categoryFormProps: CategoryFormContainerProps;
  searchProps: SearchBarProps;
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

  const fetchCategoriesAsync = async (keyword?: string) => {
    setIsLoading(true);

    try {
      const { data, status } = await axios<ApiResponse<Pagination<Category>>>({
        method: 'GET',
        url: `${API_URL}/categories?pageNumber=1&recordsPerPage=100&keyword=*${keyword || ''}*`,
      });

      if (status === 204) {
        setCategories(EMPTY_PAGINATION_VALUES);
      }

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

  const debouncedSearch = debounce(async (keyword: string) => {
    await fetchCategoriesAsync(keyword);
  }, 300);

  return {
    isLoading,
    searchProps: {
      placeholder: t('category.list.search'),
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(event.target.value);
      },
    },
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
