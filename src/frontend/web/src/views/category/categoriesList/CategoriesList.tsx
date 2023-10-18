import { CategoryItem, CategoryItemProps } from '..';
import { NoDataFound } from '../../shared/noDataFound/NoDataFound';

export interface CategoriesListProps {
  categories: CategoryItemProps[];
  onOpenModal?: () => void;
}

export const CategoriesList = ({ categories = [] }: CategoriesListProps) => {
  if (categories.length === 0) {
    return <NoDataFound />;
  }

  return categories.map((category) => {
    return <CategoryItem key={category.id} {...category} />;
  });
};
