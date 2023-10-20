import { Post } from './post';
import { Pagination } from './response';

export interface Category {
  id: string;
  title: string;
}

export interface CategoryPosts extends Category {
  posts: Pagination<Post>;
}
