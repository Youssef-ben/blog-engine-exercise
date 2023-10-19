import { PostItem, PostItemProps } from '..';
import { NoDataFound } from '../../shared/noDataFound/NoDataFound';

export interface PostsListProps {
  posts: PostItemProps[];
  onPostClick?: (id: string) => void;
}

export const PostsList = ({ posts = [], onPostClick }: PostsListProps) => {
  if (posts.length === 0) {
    return <NoDataFound />;
  }

  return posts.map((post) => {
    return <PostItem key={post.id} {...post} onClick={onPostClick} />;
  });
};
