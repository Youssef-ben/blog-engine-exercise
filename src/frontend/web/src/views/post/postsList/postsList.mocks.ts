import { PostItemProps } from '../postItem';
import { PostsListProps } from './PostsList';

const posts: PostItemProps[] = [];
for (let count = 0; count < 10; count++) {
  posts.push({
    id: `uuid-${count}`,
    title: `Post title ${count}`,
    categoryTitle: 'Category title',
    publicationDate: `2023-01-${count + 1}`,
  });
}

const defaultProps: PostsListProps = {
  posts,
};

export const postsListMocks = {
  defaultProps,
};
