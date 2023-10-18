import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryItemProps, CategoryModalProps } from '../../../../../views/category';

export interface UseEditCategoryContainerData {
  categories: CategoryItemProps[];
  categoryModal: CategoryModalProps;
}

export const useEditCategoryContainer = (): UseEditCategoryContainerData => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<CategoryItemProps>();
  const [categories, setCategories] = useState<CategoryItemProps[]>([]);

  const handleOnPrimaryClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      // TODO: Remove the timeout
      setIsLoading(false);
      handleOpenModal();
    }, 1000);
  };

  const onEditCategoryClick = (id: string) => {
    const category = categories.find((c) => c.id === id);
    console.log(categories);
    if (category) {
      handleOpenModal();
      setCurrentCategory(category);
    }
  };

  useEffect(() => {
    //TODO: Fetch the categories list
  }, []);

  const getCategories = () => {
    return categories.map((c) => {
      return {
        ...c,
        onClick: onEditCategoryClick,
      };
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return {
    categories: getCategories(),
    categoryModal: {
      isOpen: isModalOpen,
      modalTitle: t('category.form.edit'),
      value: currentCategory?.title || '',
      isLoading: isLoading,
      primaryButtonLabel: t('common.edit'),
      onPrimaryButtonClick: handleOnPrimaryClick,
      onSecondaryButtonClick: handleOpenModal,
    },
  };
};
