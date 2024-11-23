import { Component } from '@angular/core';
import {AuthService} from '../../security/auth.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {StorageService} from '../../services/storage.service';
import {tap} from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  failedAuthentication: string | undefined;

  constructor(private authService: AuthService,
              private router: Router,
              private storageService: StorageService) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).pipe(
      tap(response => {
        this.storageService.set('token', response.token);
      })
    ).subscribe({
      next: () => {
        this.router.navigate(['']).then(() => {
          this.refreshPage();
        });
      },
      error: (err) => {
        if (err.status === 401) {
          this.failedAuthentication = 'The Username or Password is Incorrect';
        }
      }
    });
  }
  refreshPage() {
    window.location.reload();
  }
}
