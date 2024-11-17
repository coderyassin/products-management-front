import { Injectable } from '@angular/core';
import {Product} from '../models/product.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map, Observable} from 'rxjs';
import {ProductList} from '../models/product-list.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.productsManagementUrl}/products`;
  products!: Product[];

  constructor(private httpClient: HttpClient) {
  }

  productsList(): Observable<ProductList> {
    return this.httpClient.get<ProductList>(this.apiUrl);
  }

  addProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.apiUrl, product);
  }

  updateProduct(product: Product) {
    console.log('Update product ', product);
  }

  deleteProduct(product: Product) {
    return this.httpClient.delete<void>(`${this.apiUrl}/${product.id}`);
  }
}
