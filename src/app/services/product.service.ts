import {Injectable} from '@angular/core';
import {Product} from '../models/product.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ProductList} from '../models/product-list.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.productsManagementUrl}/products`;

  constructor(private httpClient: HttpClient) {
  }

  productsList(): Observable<ProductList> {
    return this.httpClient.get<ProductList>(this.apiUrl);
  }

  productById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.apiUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(product: Product) {
    return this.httpClient.delete<void>(`${this.apiUrl}/${product.id}`);
  }
}
