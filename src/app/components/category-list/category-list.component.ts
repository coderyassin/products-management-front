import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {Category} from '../../models/category.model';
import {CategoryService} from '../../services/category.service';
import {Router} from '@angular/router';
import {PaginationComponent} from '../pagination/pagination.component';
import {CategoryList} from '../../models/category-list.model';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf,
    TitleCasePipe,
    NgIf,
    PaginationComponent
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  categories!: Category[];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems!: number;

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.loadingCategories();
  }

  loadingCategories() {
    this.categoryService.categoriesWithPagination(this.currentPage, this.itemsPerPage)
      .subscribe((categories: CategoryList) => {
        this.categories = categories.categories;
        this.totalItems = categories.totalElements;
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

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadingCategories();
  }
}
