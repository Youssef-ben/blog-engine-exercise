import { PostItem, PostItemProps } from '..';
import { NoDataFound } from '../../shared/noDataFound/NoDataFound';

export interface PostsListProps {
  posts: PostItemProps[];
  onAdd?: () => void;
}

export const PostsList = ({ posts = [], onAdd }: PostsListProps) => {
  if (posts.length === 0) {
    return <NoDataFound />;
  }

  return posts.map((post) => {
    return <PostItem key={post.id} {...post} />;
  });
};
