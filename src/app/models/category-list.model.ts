import {Category} from './category.model';

export interface CategoryList {
  categories: Category[];
  totalPages?: number;
  totalElements: number;
}
