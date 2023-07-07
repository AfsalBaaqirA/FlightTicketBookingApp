import { Component, inject } from '@angular/core';
import { LoginInfo } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  credentials!: LoginInfo;
  authService: AuthService;

  constructor(private toastr: ToastrService, private router: Router) {
    this.authService = inject(AuthService);
  }

  login() {
    
    if (this.loginValidate()) {
      this.credentials = {
        email: this.email,
        password: this.password
      };
      this.authService.login(this.credentials).subscribe((data) => {
        const response = data.response;
        console.log(response);
        if(response.status == '200'){
          if (response.role == 'admin'){
            this.showToastr('Admin Login Successful', 'success');
            this.authService.setLogInStatus(true, data.response.token);
            this.authService.setAdminStatus(true);
            this.router.navigate(['/admin/flights']);
            return;
          }
          this.authService.setLogInStatus(true, data.response.token);
          this.showToastr('Successfully Logged In Redirecting', 'success');
          this.router.navigate(['/search-flights']);
        }
        else if (response.status == '400')
          this.showToastr(response.message, 'error');
      });
    }
  }

  loginValidate(): boolean {
    if (this.email == ''){
      this.showToastr('Email is required', 'warning');
      return false;
    }
    else if (this.password == ''){
      this.showToastr('Password is required', 'warning');
      return false;
    }
    return true;
  }

  showToastr(title: string, type: string) {
    switch (type) {
      case 'success':
        this.toastr.success(title);
        break;
      case 'error':
        this.toastr.error(title);
        break;
      case 'warning':
        this.toastr.warning(title);
        break;
      case 'info':
        this.toastr.info(title);
        break;
    }
  }
}
