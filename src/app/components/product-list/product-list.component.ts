import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product.model';
import {CurrencyPipe, NgForOf} from '@angular/common';
import {ProductComponent} from '../product/product.component';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    NgForOf,
    ProductComponent,
    CurrencyPipe
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  products!: Product[];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
      this.products = this.productService.productsList();
  }

  updateProduct(product: Product) {
    this.productService.updateProduct(product);
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product);
  }
}
