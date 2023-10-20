import { PostCategoryOption } from 'Controller/page/user/userPageHeader/UserPageHeader';
import { API_URL } from 'Controller/utils/constants';
import { Category } from 'Models/category';
import { ApiResponse, Pagination } from 'Models/response';
import axios from 'axios';

export const fetchCategoriesAsync = async (): Promise<PostCategoryOption[]> => {
  try {
    const { data } = await axios<ApiResponse<Pagination<Category>>>({
      method: 'GET',
      url: `${API_URL}/categories?pageNumber=1&recordsPerPage=100`,
    });

    if (data) {
      const postCategoriesOption = data.results.records.map((category) => {
        return {
          value: category.id,
          label: category.title,
        };
      });

      return postCategoriesOption;
    }

    return [];
  } catch (error: any) {
    console.log(error);
    return [];
  }
};
