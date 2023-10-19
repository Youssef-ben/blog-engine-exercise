import { PostItemProps } from './PostItem';

const defaultProps: Partial<PostItemProps> = {
  id: 'uuid-1',
  title: 'Post title 1',
  categoryTitle: 'Category title',
  publicationDate: '2023-09-15',
};

export const postItemMocks = {
  defaultProps,
};
