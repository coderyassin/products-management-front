import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Product} from '../../models/product.model';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForOf} from '@angular/common';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/category.model';

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
  product: Product = {category: {name: "", description: ""}, name: "", price: 0.0};
  categories!: Category[];
  selectedCategoryId!: number;

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadCategories();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.productService.productById(id)
        .subscribe((product: Product) => {
          this.product = product;
          if(this.product.category.id) {
            this.selectedCategoryId = this.product.category.id;
          }
        })
      this.actionTitle = 'Update a product :';
      this.action = 'Update';
    }
  }

  loadCategories(): void {
    this.categoryService.categories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      })
  }

  onAction() {
    if(this.selectedCategoryId) {
      this.product.category.id = this.selectedCategoryId;
    }

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
