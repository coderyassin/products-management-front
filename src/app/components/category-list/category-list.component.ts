import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {Category} from '../../models/category.model';
import {CategoryService} from '../../services/category.service';
import {Router} from '@angular/router';
import {PaginationComponent} from '../pagination/pagination.component';
import {CategoryList} from '../../models/category-list.model';
import {FormsModule} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {CategoryDetailComponent} from '../category-detail/category-detail.component';
import {HasRoleDirective} from "../../directives/has-role.directive";

@Component({
  selector: 'app-category-list',
  standalone: true,
    imports: [
        CurrencyPipe,
        NgForOf,
        TitleCasePipe,
        NgIf,
        PaginationComponent,
        FormsModule,
        HasRoleDirective
    ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  categories!: Category[];
  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalItems!: number;
  search: string = '';
  showPagination: boolean = true;

  constructor(private categoryService: CategoryService,
              private router: Router,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadingCategories();
  }

  loadingCategories() {
    if(this.search.trim().length > 0) {
      this.onSearch();
    } else {
      this.searchProducts(false);
    }
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
    this.searchProducts(false);
  }

  onSearch() {
    this.searchProducts(true);
  }

  searchProducts(fromSearch: boolean) {
    if(fromSearch) {
      this.currentPage = 1;
    }
    this.categoryService.searchByName(this.search, this.currentPage, this.itemsPerPage)
      .subscribe((categories: CategoryList) => {
        this.categories = categories.categories;
        this.totalItems = categories.totalElements;
        this.togglePagination();
      });
  }

  togglePagination(): void {
    this.showPagination = false;
    setTimeout(() => {
      this.showPagination = true;
    }, 0);
  }

  openCategoryDetail(category: Category) {
    this.dialog.open(CategoryDetailComponent, {
      data: category,
      width: '600px',
      panelClass: 'custom-dialog-container'
    });
  }
}
