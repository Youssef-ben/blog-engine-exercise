import { CategoryItem } from '..';
import { Category } from '../../../models/categoryDto';
import { Pagination } from '../../../models/response';
import { NoDataFound } from '../../shared/noDataFound/NoDataFound';

export interface CategoriesListProps {
  categories?: Pagination<Category>;
  onClick?: (id: string) => void;
}

export const CategoriesList = ({ categories, onClick }: CategoriesListProps) => {
  if (!categories || categories.firstPage === 0) {
    return <NoDataFound />;
  }

  return categories.records.map((category) => {
    return <CategoryItem key={category.id} {...category} onClick={onClick} />;
  });
};
