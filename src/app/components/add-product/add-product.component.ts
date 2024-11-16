import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Product} from '../../models/product.model';
import {ProductService} from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{
  product!: Product;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.product = { name: "", price: 0.0 };
  }

  addProduct() {
    this.productService.addProduct(this.product);
    this.router.navigate(['/products'])
      .then(() => {
        console.log('Successful navigation !');
      }).catch((err) => {
      console.error('Navigation error :', err);
    });
  }
}
