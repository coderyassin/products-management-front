import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../security/auth.service';
import {StorageService} from '../../services/storage.service';
import {User} from '../../models/user.model';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  user!: User | null;

  constructor(private authService: AuthService,
              private router: Router,
              private storageService: StorageService) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    })
  }

  logout() {
    this.storageService.remove('token');
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/login']);
  }
}
