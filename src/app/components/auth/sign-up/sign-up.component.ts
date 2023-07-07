import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignUpInfo } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  user!: SignUpInfo;
  authService: AuthService;

  constructor(private toastr: ToastrService, private router: Router) {
    this.authService = inject(AuthService);
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.firstName = '';
    this.lastName = '';
  }

  signUp() {
    if (this.validate()) {
      this.user = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
      };

      this.authService.signup(this.user).subscribe((data) => {
        const response = data.response;
        if(response.status == '200'){
          this.showToastr('Successfully Signed Up', 'success');
          this.router.navigate(['/login']);
        }
        else if (response.status == '400')
          this.showToastr(response.message, 'error');
      });

    }
  }

  validate(): boolean {
    if (this.firstName == ''){
      this.showToastr('First Name is required', 'warning');
      return false;
    }
    else if (this.lastName == ''){
      this.showToastr('Last Name is required', 'warning');
      return false;
    }
    else if (this.email == ''){
      this.showToastr('Email is required', 'warning');
      return false;
    }
    else if (this.password == ''){
      this.showToastr('Password is required', 'warning');
      return false;
    }
    else if (this.confirmPassword == ''){
      this.showToastr('Confirm Password is required', 'warning');
      return false;
    }
    else if (this.password != this.confirmPassword){
      this.showToastr('Password and Confirm Password should be same', 'warning');
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
