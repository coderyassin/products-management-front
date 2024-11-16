import { Injectable } from '@angular/core';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products!: Product[];

  constructor() {
    this.products = [
      {name: "Laptop", price: 1500.0, category: { name: "Electronics", description: "All about electronics" }},
      {name: "Printer", price: 3800.0, category: { name: "Electronics", description: "All about electronics" }},
      {name: "Tablet", price: 2600.0, category: { name: "Electronics", description: "All about electronics" }}
    ];
  }

  productsList(): Product[] {
      return this.products;
  }

  addProduct(product: Product) {
    this.products.push(product);
  }

  updateProduct(product: Product) {
    console.log('Update product ', product);
  }

  deleteProduct(product: Product) {
    console.log('Delete product ', product);
  }
}
