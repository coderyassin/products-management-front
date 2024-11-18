import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgForOf, TitleCasePipe} from '@angular/common';
import {Category} from '../../models/category.model';
import {CategoryService} from '../../services/category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf,
    TitleCasePipe
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  categories!: Category[];

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.loadingCategories();
  }

  loadingCategories() {
    this.categoryService.categories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      })
  }

  updateCategory(category: Category) {
    this.router.navigate(['/update-category', category.id]);
  }

  deleteCategory(category: Category) {
    this.categoryService.deleteCategory(category)
      .subscribe(() => {
        this.loadingCategories();
      });
  }
}
