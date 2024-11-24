import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../security/auth.service';
import {User} from '../../models/user.model';
import {NgIf} from '@angular/common';
import {HasRoleDirective} from '../../directives/has-role.directive';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product.model';
import {map} from 'rxjs';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    HasRoleDirective
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  user!: User | null;
  products!: Product[];

  constructor(private authService: AuthService,
              private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    })
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/login']);
  }

  exportProducts() {
    this.productService.productsList()
      .pipe(map(products => products.products))
      .subscribe(products => {
        if(products) {
          this.productService.exportToCsv(products);
        }
      });
  }

  exportCategories() {
    this.categoryService.categories()
      .pipe(map(categories => categories))
      .subscribe(categories => {
        if(categories) {
          this.categoryService.exportToCsv(categories);
        }
      });
  }
}
