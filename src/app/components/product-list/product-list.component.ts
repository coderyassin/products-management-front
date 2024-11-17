import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product.model';
import {CurrencyPipe, NgForOf, TitleCasePipe, UpperCasePipe} from '@angular/common';
import {ProductComponent} from '../product/product.component';
import {ProductService} from '../../services/product.service';
import {ProductList} from '../../models/product-list.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    NgForOf,
    ProductComponent,
    CurrencyPipe,
    UpperCasePipe,
    TitleCasePipe
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  products!: Product[];

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
      this.loadingProducts();
  }

  loadingProducts() {
    this.productService.productsList()
      .subscribe((products: ProductList) => {
        this.products = products.products;
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
}
