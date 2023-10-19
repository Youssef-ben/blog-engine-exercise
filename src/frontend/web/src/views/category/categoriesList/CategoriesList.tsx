import { NoDataFound } from 'Views/shared';
import { CategoryItem, CategoryItemProps } from '../categoryItem';

export interface CategoriesListProps {
  categories?: CategoryItemProps[];
  onCategoryClick?: (id: string) => void;
}

export const CategoriesList = ({ categories, onCategoryClick }: CategoriesListProps) => {
  if (!categories || categories.length === 0) {
    return <NoDataFound />;
  }

  return categories.map((category) => {
    return <CategoryItem key={category.id} {...category} onClick={onCategoryClick} />;
  });
};
