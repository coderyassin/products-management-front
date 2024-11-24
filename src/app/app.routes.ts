import {Routes} from '@angular/router';
import {ProductListComponent} from './components/product-list/product-list.component';
import {AddProductComponent} from './components/add-product/add-product.component';
import {CategoryListComponent} from './components/category-list/category-list.component';
import {ManageCategoryComponent} from './components/manage-category/manage-category.component';
import {AuthGuard} from './security/auth-guard';
import {LoginComponent} from './components/login/login.component';
import {UnauthorizedComponent} from './components/unauthorized/unauthorized.component';
import {HomeComponent} from './components/home/home.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductListComponent, canActivate: [AuthGuard], data: { roles: ['USER', 'ADMIN'] } },
  { path: 'products/:search', component: ProductListComponent, canActivate: [AuthGuard], data: { roles: ['USER', 'ADMIN'] } },
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'update-product/:id', component: AddProductComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: '', redirectTo: "home", pathMatch: "full" },
  { path: 'categories', component: CategoryListComponent, canActivate: [AuthGuard], data: { roles: ['USER', 'ADMIN'] } },
  { path: 'add-category', component: ManageCategoryComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'update-category/:id', component: ManageCategoryComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
];
