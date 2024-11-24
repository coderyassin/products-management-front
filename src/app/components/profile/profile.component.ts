import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../security/auth.service';
import {Router} from '@angular/router';
import {User} from '../../models/user.model';
import {map} from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser
      .pipe(map(user => user))
      .subscribe(user => {
        this.user = user;
      });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
