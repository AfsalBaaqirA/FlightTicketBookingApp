import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Flight Ticket Booking App';
  authService!: AuthService;

  constructor(private router: Router) {
    this.authService = inject(AuthService);
  }

  ngOnInit(): void {
    if(this.router.url == '/search-flights' || this.router.url == '/view-ticket'){
      this.authService.validate();
    }
  }

}
