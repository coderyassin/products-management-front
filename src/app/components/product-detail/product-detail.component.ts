import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {Product} from '../../models/product.model';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    NgIf,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
