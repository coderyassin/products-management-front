import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../models/category.model';
import {CategoryList} from '../models/category-list.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.productsManagementUrl}/categories`;

  constructor(private httpClient: HttpClient) {
  }

  categories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.apiUrl);
  }

  categoriesWithPagination(page: number, size: number): Observable<CategoryList> {
    const options = { params: new HttpParams().set('page', page).set('size', size) } ;
    return this.httpClient.get<CategoryList>(`${this.apiUrl}/all`, options);
  }

  categoryById(id: number): Observable<Category> {
    return this.httpClient.get<Category>(`${this.apiUrl}/${id}`);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.httpClient.put<Category>(`${this.apiUrl}/${category.id}`, category);
  }

  addCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.apiUrl, category);
  }

  deleteCategory(category: Category) {
    return this.httpClient.delete<void>(`${this.apiUrl}/${category.id}`);
  }

  searchByName(search: string, page: number, size: number): Observable<CategoryList> {
    const options = { params: new HttpParams().set('page', page).set('size', size).set('search', search) } ;
    return this.httpClient.get<CategoryList>(`${this.apiUrl}/search`, options);
  }
}
