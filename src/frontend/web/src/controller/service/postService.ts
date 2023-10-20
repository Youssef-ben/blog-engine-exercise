import { useErrorsContext } from 'Controller/provider';
import { UpdateNotifier } from 'Controller/utils/UpdateNotifier';
import { API_URL } from 'Controller/utils/constants';
import { getErrorMessage } from 'Controller/utils/responseHelpers';
import { Post } from 'Models/post';
import { ApiResponse, EMPTY_PAGINATION_VALUES, Pagination } from 'Models/response';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export interface UsePostServiceData {
  savePostAsync: (post: Post, postId: string) => Promise<boolean>;
  fetchPostsAsync: (keyword?: string) => Promise<Pagination<Post>>;
  fetchPostByIdAsync: (postId: string) => Promise<Post | undefined>;
}

export const usePostService = () => {
  const { t } = useTranslation();

  const { setMessage } = useErrorsContext();

  const fetchPostByIdAsync = async (postId: string): Promise<Post | undefined> => {
    try {
      const result = await axios<ApiResponse<Post>>({
        method: 'GET',
        url: `${API_URL}/posts/${postId}`,
      });

      if (result.status === 200) {
        const { results } = result.data;
        return results;
      }
    } catch (error: any) {
      const errorMessage = t(getErrorMessage(error));
      console.error(errorMessage);
      setMessage(errorMessage);
    }

    return undefined;
  };

  const savePostAsync = async (post: Post, isUpdate: boolean) => {
    try {
      await axios<Post, ApiResponse<Post>>({
        method: isUpdate ? 'PUT' : 'POST',
        url: `${API_URL}/posts/admin`,
        data: post,
      });

      UpdateNotifier.notify('posts');
      return true;
    } catch (error: any) {
      const errorMessage = t(getErrorMessage(error));
      console.error(errorMessage);
      setMessage(errorMessage);
      return false;
    }
  };

  const fetchPostsAsync = async (keyword?: string) => {
    try {
      const { data, status } = await axios<ApiResponse<Pagination<Post>>>({
        method: 'GET',
        url: `${API_URL}/posts/admin?pageNumber=1&recordsPerPage=100&keyword=*${keyword || ''}*`,
      });

      if (status === 204) {
      }

      if (data) {
        return data.results;
      }
    } catch (error: any) {
      const errorMessage = t(getErrorMessage(error));
      console.error(errorMessage);
      setMessage(errorMessage);
    }

    return EMPTY_PAGINATION_VALUES;
  };

  return {
    savePostAsync,
    fetchPostsAsync,
    fetchPostByIdAsync,
  };
};
