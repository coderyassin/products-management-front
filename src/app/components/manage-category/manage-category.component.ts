import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {Category} from '../../models/category.model';
import {CategoryService} from '../../services/category.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-manage-category',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf
    ],
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.css'
})
export class ManageCategoryComponent implements OnInit {
  actionTitle: string = 'Add a category :';
  action: string = 'Add';
  category: Category = {name: '', description: ''};

  constructor(private categoryService: CategoryService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.categoryService.categoryById(id)
        .subscribe((category: Category) => {
          this.category = category;
        })
      this.actionTitle = 'Update a category :';
      this.action = 'Update';
    }
  }

  onAction() {
    if (this.category.id) {
      this.categoryService.updateCategory(this.category)
        .subscribe((category: Category) => {
          this.router.navigate(['/categories']);
        });
    } else {
      this.categoryService.addCategory(this.category)
        .subscribe((category: Category) => {
          this.router.navigate(['/categories']);
        });
    }
  }
}
