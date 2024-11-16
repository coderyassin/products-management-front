import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product.model';
import {CurrencyPipe, NgForOf} from '@angular/common';
import {ProductComponent} from '../product/product.component';

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

  ngOnInit(): void {
      this.products = [
        {name: "Laptop", price: 1500.0, category: { name: "Electronics", description: "All about electronics" }},
        {name: "Laptop", price: 1500.0, category: { name: "Electronics", description: "All about electronics" }},
        {name: "Laptop", price: 1500.0, category: { name: "Electronics", description: "All about electronics" }}
      ];
  }

}
