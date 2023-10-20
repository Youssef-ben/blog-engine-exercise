import { useCategoryService } from 'Controller/service/categoryService';
import { usePostService } from 'Controller/service/postService';
import { UpdateNotifier } from 'Controller/utils/UpdateNotifier';
import { convertDateToString } from 'Controller/utils/constants';
import { Post } from 'Models/post';
import { AppModalProps } from 'Views/shared';
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

  const { fetchCategoriesAsync } = useCategoryService();
  const { savePostAsync, fetchPostByIdAsync } = usePostService();

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

        if (!(await savePostAsync(values, !!postId))) {
          setIsLoading(false);
          return;
        }

        handleOnSecondaryButtonClick();
      },
    });

  useEffect(() => {
    getCategoriesAsync();

    /**
     * This normally should be a websocket connection with the web api
     * But for the purpose of this exercise we added a little pub/sub handler.
     */
    UpdateNotifier.subscribe('categories', async () => {
      await getCategoriesAsync();
    });
  }, []);

  useEffect(() => {
    if (postId) {
      getPostByIdAsync();
    }
  }, [postId]);

  const getCategoriesAsync = async () => {
    setIsLoading(true);

    const result = await fetchCategoriesAsync();
    const postCategoriesOption = result.records.map((category) => {
      return {
        value: category.id,
        label: category.title,
      };
    });
    setPostCategories(postCategoriesOption);

    setIsLoading(false);
  };

  const getPostByIdAsync = async () => {
    if (postId) {
      setIsLoading(true);
      const result = await fetchPostByIdAsync(postId);
      if (!result) {
        handleOnSecondaryButtonClick();
        return;
      }

      setValues({
        id: result.id,
        title: result.title,
        content: result.content,
        categoryId: result.categoryId,
        publicationDate: result.publicationDate,
      });

      setIsLoading(false);
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
