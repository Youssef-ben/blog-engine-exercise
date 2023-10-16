import { CategoriesListProps } from '.';
import { CategoryItemProps } from '..';

const categories: CategoryItemProps[] = [];
for (let count = 0; count < 10; count++) {
  categories.push({
    id: `uuid-${count}`,
    title: `Category ${count}`,
  });
}
const defaultProps: CategoriesListProps = {
  categories,
};

export const categoriesListMocks = {
  defaultProps,
};
