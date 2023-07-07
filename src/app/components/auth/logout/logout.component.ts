import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { LoadingComponent } from '../../loading/loading.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{

  @ViewChild('loading', {static: true}) loading!: LoadingComponent;
  authService: AuthService;

  constructor(private router: Router) { 
    this.authService = inject(AuthService);
  }

  ngOnInit(): void {
    this.loading.showLoading("Logging Out...");
    this.authService.logout().subscribe((data: any) => {
      data = data.response;
      if (data.status === '200') {
        this.authService.setLogInStatus(false, '');
        this.authService.setAdminStatus(false);
        this.router.navigate(['/']);
      }
    });
  }
}
