import { UpdateNotifier } from 'Controller/utils/UpdateNotifier';
import { API_URL, convertDateToString } from 'Controller/utils/constants';
import { getErrorMessage } from 'Controller/utils/responseHelpers';
import { Category } from 'Models/category';
import { Post } from 'Models/post';
import { ApiResponse, Pagination } from 'Models/response';
import { AppModalProps } from 'Views/shared';
import axios from 'axios';
import { FormikErrors, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { PostFormContainerProps } from './PostFormContainer';

const INITIAL_VALUES: Post = {
  title: '',
  content: '',
  categoryId: '',
  publicationDate: convertDateToString(new Date()),
  category: undefined,
};

export interface PostCategoryOption {
  value: string;
  label: string;
}

export interface PostModalCategories {
  selected?: PostCategoryOption;
  categories: PostCategoryOption[];
}

export interface UsePostFormContainerData {
  isLoading: boolean;
  appModalProps: AppModalProps;
  selectOptionProps: PostModalCategories;
  formProps: {
    values: Post;
    apiError: string;
    errors: FormikErrors<Post>;
    handleChange: {
      (e: React.ChangeEvent<any>): void;
      <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
        ? void
        : (e: string | React.ChangeEvent<any>) => void;
    };
  };
}

export const usePostFormContainer = ({
  postId,
  isModalOpen,
  handleIsModalOpen,
}: PostFormContainerProps): UsePostFormContainerData => {
  const { t } = useTranslation();

  const [apiError, setApiError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postCategories, setPostCategories] = useState<PostCategoryOption[]>([]);

  const { values, errors, isValid, setValues, handleSubmit, handleChange, resetForm } =
    useFormik<Post>({
      initialValues: INITIAL_VALUES,
      validationSchema: Yup.object().shape({
        title: Yup.string().trim().required(t('post.form.error.titleRequired')),
        content: Yup.string().trim().required(t('post.form.error.contentRequired')),
        categoryId: Yup.string().trim().required(t('post.form.error.contentRequired')),
        publicationDate: Yup.string().trim().required(t('post.form.error.publicationDateRequired')),
      }),
      onSubmit: async () => {
        setIsLoading(true);

        if (!(await savePostAsync())) {
          setIsLoading(false);
          return;
        }

        handleOnSecondaryButtonClick();
      },
    });

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

  useEffect(() => {
    if (postId) {
      fetchPostByIdAsync();
    }
  }, [postId]);

  const fetchCategoriesAsync = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios<ApiResponse<Pagination<Category>>>({
        method: 'GET',
        url: `${API_URL}/categories?recordsPerPage=100`,
      });

      if (data) {
        const postCategoriesOption = data.results.records.map((category) => {
          return {
            value: category.id,
            label: category.title,
          };
        });

        setPostCategories(postCategoriesOption);
      }
    } catch (error: any) {
      return [];
    }

    setIsLoading(false);
  };

  const fetchPostByIdAsync = async () => {
    try {
      const result = await axios<ApiResponse<Post>>({
        method: 'GET',
        url: `${API_URL}/posts/${postId}`,
      });

      if (result.status === 200) {
        const { results } = result.data;
        setValues({
          id: results.id,
          title: results.title,
          content: results.content,
          categoryId: results.categoryId,
          publicationDate: results.publicationDate,
        });
      }
    } catch (err: any) {
      setApiError(t(getErrorMessage(err)));
    }
  };

  const savePostAsync = async () => {
    console.log(values);
    try {
      await axios<Post, ApiResponse<Post>>({
        method: postId ? 'PUT' : 'POST',
        url: `${API_URL}/posts/admin`,
        data: {
          ...values,
          id: postId || '',
        },
      });

      UpdateNotifier.notify('posts');
      return true;
    } catch (err: any) {
      setApiError(t(getErrorMessage(err)));
      return false;
    }
  };

  const getSelectedCategory = () => {
    return postCategories.find((category) => category.value === values.categoryId);
  };

  const handleOnSecondaryButtonClick = () => {
    handleIsModalOpen && handleIsModalOpen();
    setIsLoading(false);
    resetForm();
  };

  const isPrimaryButtonDisabled = () => {
    const { title, categoryId, content } = values;
    const emptyValues = !title || !categoryId || !content;

    return emptyValues || !isValid;
  };

  return {
    isLoading,
    formProps: {
      values,
      errors,
      apiError,
      handleChange,
    },
    selectOptionProps: {
      categories: postCategories,
      selected: getSelectedCategory(),
    },
    appModalProps: {
      isOpen: isModalOpen,
      modalTitle: postId ? t('post.form.edit') : t('post.form.add'),
      primaryButtonLabel: t('common.save'),
      isDisabled: isPrimaryButtonDisabled(),
      onPrimaryButtonClick: handleSubmit,
      onSecondaryButtonClick: handleOnSecondaryButtonClick,
    },
  };
};
