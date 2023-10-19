import { Category } from './category';

export interface Post {
  id?: string;
  categoryId: string;
  title: string;
  content: string;
  publicationDate: string;
  category?: Category;
}
