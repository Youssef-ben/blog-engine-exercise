import { UpdateNotifier } from 'Controller/utils/UpdateNotifier';
import { API_URL } from 'Controller/utils/constants';
import { getErrorMessage } from 'Controller/utils/responseHelpers';
import { Category } from 'Models/category';
import { ApiResponse } from 'Models/response';
import { AppModalProps } from 'Views/shared';
import axios from 'axios';
import { FormikErrors, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { CategoryFormContainerProps } from './CategoryFormContainer';

const INITIAL_VALUES: Category = {
  id: '',
  title: '',
};

export interface UseCategoryFormContainerData {
  isLoading: boolean;
  appModalProps: AppModalProps;
  formProps: {
    values: Category;
    apiError: string;
    errors: FormikErrors<Category>;
    handleChange: {
      (e: React.ChangeEvent<any>): void;
      <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
        ? void
        : (e: string | React.ChangeEvent<any>) => void;
    };
  };
}

export const useCategoryFormContainer = ({
  isModalOpen,
  handleIsModalOpen,
  categoryId,
}: CategoryFormContainerProps): UseCategoryFormContainerData => {
  const { t } = useTranslation();

  const [apiError, setApiError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { values, errors, isValid, setValues, handleSubmit, handleChange, resetForm } =
    useFormik<Category>({
      initialValues: INITIAL_VALUES,
      validationSchema: Yup.object().shape({
        title: Yup.string().trim().required(t('category.form.error.titleRequired')),
      }),
      onSubmit: async () => {
        setIsLoading(true);

        if (!(await saveCategoryAsync())) {
          setIsLoading(false);
          return;
        }

        handleOnSecondaryButtonClick();
      },
    });

  useEffect(() => {
    if (categoryId) {
      fetchCategoryByIdAsync();
    }
  }, [categoryId]);

  const fetchCategoryByIdAsync = async () => {
    try {
      const result = await axios<ApiResponse<Category>>({
        method: 'GET',
        url: `${API_URL}/categories/${categoryId}`,
      });

      if (result.status === 200) {
        const { results } = result.data;
        setValues({
          id: results.id,
          title: results.title,
        });
      }
    } catch (err: any) {
      setApiError(t(getErrorMessage(err)));
    }
  };

  const saveCategoryAsync = async () => {
    try {
      await axios<Category, ApiResponse<Category>>({
        method: categoryId ? 'PUT' : 'POST',
        url: `${API_URL}/categories/admin`,
        data: {
          ...values,
        },
      });

      UpdateNotifier.notify('posts');
      UpdateNotifier.notify('categories');
      return true;
    } catch (err: any) {
      setApiError(t(getErrorMessage(err)));
      return false;
    }
  };

  const handleOnSecondaryButtonClick = () => {
    handleIsModalOpen && handleIsModalOpen();
    setIsLoading(false);
    resetForm();
  };

  return {
    isLoading,
    formProps: {
      values,
      errors,
      apiError,
      handleChange,
    },
    appModalProps: {
      isOpen: isModalOpen,
      isLoading: isLoading,
      modalTitle: categoryId ? t('category.form.edit') : t('category.form.add'),
      primaryButtonLabel: t('common.save'),
      isDisabled: !isValid || !values.title,
      onPrimaryButtonClick: handleSubmit,
      onSecondaryButtonClick: handleOnSecondaryButtonClick,
    },
  };
};
