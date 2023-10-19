import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Category } from '../../../../../models/category';
import { Post } from '../../../../../models/post';
import { ApiResponse, Pagination } from '../../../../../models/response';
import { PostCategoryOption, PostModalProps } from '../../../../../views/post/postModal';
import { UpdateNotifier } from '../../../../utils/UpdateNotifier';
import { API_URL, formatDate } from '../../../../utils/constants';
import { getErrorMessage } from '../../../../utils/responseHelpers';

const INITIAL_VALUES: PostForm = {
  title: '',
  content: '',
  categoryId: '',
  publicationDate: new Date(),
  apiError: '',
};

export interface UseAddPostContainerData {
  handleOpenModal: () => void;
  postModal: PostModalProps;
}

type PostForm = Post & {
  apiError?: string;
};

export const useAddPostContainer = (): UseAddPostContainerData => {
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [postCategories, setPostCategories] = useState<PostCategoryOption[]>([]);

  const handlePrimaryButtonClick = async () => {
    setIsLoading(true);

    if (!(await addPostAsync())) {
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setIsModalOpen(false);
    resetForm();
  };

  const { values, errors, handleSubmit, handleChange, setErrors, resetForm } = useFormik<PostForm>({
    initialValues: INITIAL_VALUES,
    validationSchema: Yup.object().shape({
      title: Yup.string().trim().required(t('post.form.error.titleRequired')),
      content: Yup.string().trim().required(t('post.form.error.contentRequired')),
      categoryId: Yup.string().trim().required(t('post.form.error.contentRequired')),
      publicationDate: Yup.string().trim().required(t('post.form.error.publicationDateRequired')),
    }),
    onSubmit: handlePrimaryButtonClick,
  });

  const fetchCategories = async () => {
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

  const addPostAsync = async () => {
    try {
      await axios<Post, ApiResponse<Post>>({
        method: 'POST',
        url: `${API_URL}/posts/admin`,
        data: {
          ...values,
          publicationDate: formatDate(values.publicationDate),
        },
      });

      UpdateNotifier.notify('posts');
      return true;
    } catch (err: any) {
      setErrors({ apiError: getErrorMessage(err) });
      return false;
    }
  };

  useEffect(() => {
    fetchCategories();

    /**
     * This normally should be a websocket connection with the web api
     * But for the purpose of this exercise we added a little pub/sub handler.
     */
    UpdateNotifier.subscribe('category', () => {
      fetchCategories();
    });
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsLoading(false);
    resetForm();
  };

  const getSelectedCategory = () => {
    return postCategories.find((category) => category.value === values.categoryId);
  };

  return {
    handleOpenModal,
    postModal: {
      error: {
        messages: [errors.title as string, errors.content as string, errors.categoryId as string].filter((m) => m),
      },
      isOpen: isModalOpen,
      isLoading: isLoading,
      modalTitle: t('post.form.add'),
      primaryButtonLabel: t('common.save'),
      onPrimaryButtonClick: handleSubmit,
      onSecondaryButtonClick: handleOpenModal,

      title: values.title,
      content: values.content,
      publicationDate: values.publicationDate,
      categoriesOptions: {
        categories: postCategories,
        selected: getSelectedCategory(),
      },
      handleChange,
    },
  };
};
