import { useCategoryService } from 'Controller/service/categoryService';
import { Category } from 'Models/category';
import { AppModalProps } from 'Views/shared';
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
    apiError?: string;
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

  const { saveCategoryAsync, fetchCategoryByIdAsync } = useCategoryService();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { values, errors, isValid, setValues, handleSubmit, handleChange, resetForm } =
    useFormik<Category>({
      initialValues: INITIAL_VALUES,
      validationSchema: Yup.object().shape({
        title: Yup.string().trim().required(t('category.form.error.titleRequired')),
      }),
      onSubmit: async () => {
        setIsLoading(true);

        if (!(await saveCategoryAsync(values, !!categoryId))) {
          setIsLoading(false);
          return;
        }

        handleOnSecondaryButtonClick();
      },
    });

  useEffect(() => {
    getCategoryByIdAsync();
  }, [categoryId]);

  const getCategoryByIdAsync = async () => {
    if (categoryId) {
      setIsLoading(true);
      const result = await fetchCategoryByIdAsync(categoryId);
      if (!result) {
        handleOnSecondaryButtonClick();
        return;
      }

      setValues({
        id: result.id,
        title: result.title,
      });

      setIsLoading(false);
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
