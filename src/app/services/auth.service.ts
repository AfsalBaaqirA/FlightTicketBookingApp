import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginInfo, SignUpInfo } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:5000/api/auth';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: LoginInfo): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, credentials);
  }

  signup(user: SignUpInfo): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  logout(): Observable<any> {
    const body = {
      token: localStorage.getItem('token')
    }
    return this.http.post(`${this.baseUrl}/signout`, body);
  }

  getLogInStatus(): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn == 'true')
      return true;
    return false;
  }

  setLogInStatus(status: boolean, token: string) {
    localStorage.setItem('isLoggedIn', status.toString());
    localStorage.setItem('token', token);
  }

  validateToken(): Observable<any> {
    const body = {
      token: localStorage.getItem('token')
    }
    return this.http.post(`${this.baseUrl}/validate`, body);
  }

  validate(): boolean {
    let valid = true;
    const token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!token) {
      this.setLogInStatus(false, '');
      return false;
    }
    if (isLoggedIn === 'true' && token) {
      this.validateToken().subscribe((data) => {
        const response = data.response;
        if (response.status === '200') {
          if (response.role === 'admin'){
            this.setAdminStatus(true);
          }
          else{
            this.setAdminStatus(false);
          }
          this.setLogInStatus(true, token);
          return true;
        } 
        else {
          this.setLogInStatus(false, '');
          this.setAdminStatus(false);
          console.log('invalid');
          this.router.navigate(['/login']);
          return false;
        }
      });
    }
    return true;
  }

  setAdminStatus(status: boolean) {
    localStorage.setItem('isAdmin', status.toString());
  }
}
