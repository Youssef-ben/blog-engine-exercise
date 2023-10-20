import { useErrorsContext } from 'Controller/provider';
import { API_URL, UpdateNotifier, getErrorMessage } from 'Controller/utils';
import { Category, CategoryPosts } from 'Models/category';
import { ApiResponse, EMPTY_PAGINATION_VALUES, Pagination } from 'Models/response';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export interface UseCategoryServiceData {
  fetchCategoriesAsync: () => Promise<Pagination<Category>>;
  fetchCategoryByIdAsync: (categoryId: string) => Promise<Category | undefined>;
  saveCategoryAsync: (category: Category, isUpdate: boolean) => Promise<boolean>;
  searchCategoryPostsAsync: (categoryId: string, keyword?: string) => Promise<CategoryPosts>;
}

export const useCategoryService = (): UseCategoryServiceData => {
  const { t } = useTranslation();

  const { setMessage } = useErrorsContext();

  const fetchCategoriesAsync = async (): Promise<Pagination<Category>> => {
    try {
      const { data } = await axios<ApiResponse<Pagination<Category>>>({
        method: 'GET',
        url: `${API_URL}/categories?pageNumber=1&recordsPerPage=100`,
      });

      if (data && data.results) {
        return data.results;
      }
    } catch (error: any) {
      const errorMessage = t(getErrorMessage(error));
      console.error(errorMessage);
      setMessage(errorMessage);
    }

    return EMPTY_PAGINATION_VALUES;
  };

  const fetchCategoryByIdAsync = async (categoryId: string): Promise<Category | undefined> => {
    try {
      const result = await axios<ApiResponse<Category>>({
        method: 'GET',
        url: `${API_URL}/categories/${categoryId}`,
      });

      if (result.status === 200) {
        const { results } = result.data;
        return {
          id: results.id,
          title: results.title,
        };
      }
    } catch (error: any) {
      const errorMessage = t(getErrorMessage(error));
      console.error(errorMessage);
      setMessage(errorMessage);
    }

    return undefined;
  };

  const searchCategoryPostsAsync = async (
    categoryId: string,
    keyword?: string
  ): Promise<CategoryPosts> => {
    try {
      const { data } = await axios<ApiResponse<CategoryPosts>>({
        method: 'GET',
        url: `${API_URL}/categories/${categoryId}/posts?pageNumber=1&recordsPerPage=100&keyword=*${
          keyword || ''
        }*`,
      });

      if (data && data.results) {
        return data.results;
      }
    } catch (error: any) {
      const errorMessage = t(getErrorMessage(error));
      console.error(errorMessage);
      setMessage(errorMessage);
    }

    return {
      id: categoryId,
      title: '',
      posts: EMPTY_PAGINATION_VALUES,
    };
  };

  const saveCategoryAsync = async (category: Category, isUpdate: boolean): Promise<boolean> => {
    try {
      await axios<Category, ApiResponse<Category>>({
        method: isUpdate ? 'PUT' : 'POST',
        url: `${API_URL}/categories/admin`,
        data: category,
      });

      UpdateNotifier.notify('posts');
      UpdateNotifier.notify('categories');
      return true;
    } catch (error: any) {
      const errorMessage = t(getErrorMessage(error));
      console.error(errorMessage);
      setMessage(errorMessage);
      return false;
    }
  };

  return {
    saveCategoryAsync,
    fetchCategoriesAsync,
    fetchCategoryByIdAsync,
    searchCategoryPostsAsync,
  };
};
