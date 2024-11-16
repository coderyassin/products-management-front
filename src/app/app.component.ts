import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ProductListComponent} from './components/product-list/product-list.component';
import {AddProductComponent} from './components/add-product/add-product.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent, AddProductComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
