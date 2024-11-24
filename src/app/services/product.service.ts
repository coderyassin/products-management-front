import {Injectable} from '@angular/core';
import {Product} from '../models/product.model';
import {HttpClient, HttpParams} from '@angular/common/http';
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

  products(page: number, size: number): Observable<ProductList> {
    const options = { params: new HttpParams().set('page', page).set('size', size) } ;
    return this.httpClient.get<ProductList>(`${this.apiUrl}/all`, options);
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

  searchByName(search: string, page: number, size: number): Observable<ProductList> {
    const options = { params: new HttpParams().set('page', page).set('size', size).set('search', search) } ;
    return this.httpClient.get<ProductList>(`${this.apiUrl}/search`, options);
  }

  exportToCsv(products: Product[]): void {
    const headers = ['Name', 'Price', 'Category'];

    const csvData = products.map(product => {
      return [
        product.name,
        product.price,
        product.category.name,
      ].join(',');
    });

    const csvContent = [
      headers.join(','),
      ...csvData
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'products.csv');
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
