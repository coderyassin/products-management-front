import {Routes} from '@angular/router';
import {ProductListComponent} from './components/product-list/product-list.component';
import {AddProductComponent} from './components/add-product/add-product.component';
import {CategoryListComponent} from './components/category-list/category-list.component';
import {ManageCategoryComponent} from './components/manage-category/manage-category.component';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'update-product/:id', component: AddProductComponent },
  { path: '', redirectTo: "products", pathMatch: "full" },
  { path: 'categories', component: CategoryListComponent },
  { path: 'add-category', component: ManageCategoryComponent },
  { path: 'update-category/:id', component: ManageCategoryComponent },
];
