import {Component, Input, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Product} from '../../models/product.model';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{
  actionTitle: string = 'Add a product :';
  action: string = 'Add';
  @Input({required: true}) product: Product = {name: "", price: 0.0};
  categories = [
    {
      id: 23,
      name: "Electronics"
    }
  ];

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.productService.productById(id)
        .subscribe((product: Product) => {
          this.product = product;
        })
      this.actionTitle = 'Update a product :';
      this.action = 'Update';
    }
  }

  onAction() {
    if (this.product.id) {
      this.productService.updateProduct(this.product)
        .subscribe((product: Product) => {
          console.log(product);
          this.router.navigate(['/products']);
        });
    } else {
      this.productService.addProduct(this.product)
        .subscribe((product: Product) => {
          console.log(product);
          this.router.navigate(['/products']);
        });
    }
  }
}
