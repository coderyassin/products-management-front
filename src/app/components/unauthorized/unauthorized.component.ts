import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../security/auth.service';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent implements OnInit{
  page!: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.page = this.authService.isAuthenticated() ? 'Home' : 'Login';
  }

  redirectTo() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    } else {
      this.router.navigate(['login']);
    }
  }
}
