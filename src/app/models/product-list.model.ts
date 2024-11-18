import {Product} from './product.model';

export interface ProductList {
  products: Product[];
  totalPages?: number;
  totalElements: number;
}
