import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product.model';
import {CurrencyPipe, NgForOf, NgIf, TitleCasePipe, UpperCasePipe} from '@angular/common';
import {ProductComponent} from '../product/product.component';
import {ProductService} from '../../services/product.service';
import {ProductList} from '../../models/product-list.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PaginationComponent} from '../pagination/pagination.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    NgForOf,
    ProductComponent,
    CurrencyPipe,
    UpperCasePipe,
    TitleCasePipe,
    PaginationComponent,
    NgIf,
    FormsModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products!: Product[];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems!: number;
  search: string = '';
  showPagination: boolean = true;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadingProducts();
  }

  loadingProducts() {
    const search = this.route.snapshot.params['search'];
    if(search) {
      this.search = search;
      this.productService.searchByName(this.search, this.currentPage, this.itemsPerPage)
        .subscribe((products: ProductList) => {
          this.products = products.products;
          this.totalItems = products.totalElements;
        });
    } else {
      this.productService.products(this.currentPage, this.itemsPerPage)
        .subscribe((products: ProductList) => {
          this.products = products.products;
          this.totalItems = products.totalElements;
        });
    }
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

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadingProducts();
  }

  onSearch() {
    this.productService.searchByName(this.search, this.currentPage, this.itemsPerPage)
      .subscribe((products: ProductList) => {
        this.products = products.products;
        this.totalItems = products.totalElements;
        this.togglePagination();
      });
  }

  togglePagination(): void {
    this.showPagination = false;
    setTimeout(() => {
      this.showPagination = true;
    }, 0);
  }
}
