import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product.model';
import {CurrencyPipe, NgForOf, NgIf, TitleCasePipe, UpperCasePipe} from '@angular/common';
import {ProductComponent} from '../product/product.component';
import {ProductService} from '../../services/product.service';
import {ProductList} from '../../models/product-list.model';
import {Router} from '@angular/router';
import {PaginationComponent} from '../pagination/pagination.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    NgForOf,
    ProductComponent,
    CurrencyPipe,
    UpperCasePipe,
    TitleCasePipe,
    PaginationComponent,
    NgIf
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  products!: Product[];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems!: number;

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
      this.loadingProducts();
  }

  loadingProducts() {
    this.productService.products(this.currentPage, this.itemsPerPage)
      .subscribe((products: ProductList) => {
        this.products = products.products;
        this.totalItems = products.totalElements;
      })
  }

  updateProduct(product: Product) {
    this.router.navigate(['/update-product', product.id]);
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product)
      .subscribe(() => {
        this.loadingProducts();
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadingProducts();
  }
}
