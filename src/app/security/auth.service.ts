import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {StorageService} from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.securityServiceUrl}`;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient,
              private storageService: StorageService) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      this.getUserFromToken()
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/authenticate`, { username, password });
  }

  logout() {
    this.storageService.remove('token')
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getToken(): string | null {
    return this.storageService.get('token');
  }

  private getUserFromToken(): User | null {
    const token = this.storageService.get('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return {
        id: decodedToken.id,
        username: decodedToken.username,
        roles: decodedToken.roles
      };
    }
    return null;
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.roles.includes(role) : false;
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.currentUserSubject.value;
    console.log(user);
    if (user && user.roles) {
      return user.roles.some(role => roles.includes(role));
    }
    return false;
  }
}

