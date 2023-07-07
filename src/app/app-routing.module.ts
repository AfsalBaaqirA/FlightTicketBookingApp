import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { ViewBookingsComponent } from './components/view-bookings/view-bookings.component';
import { authGuard } from './guards/auth.guard';
import { FlightManagementComponent } from './components/admin/flight-management/flight-management.component';
import { SearchFlightsComponent } from './components/search-flights/search-flights.component';
import { BookFlightComponent } from './components/book-flight/book-flight.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'login', pathMatch: 'full', component: LoginComponent, canActivate: [authGuard]},
  {path: 'signup', pathMatch: 'full', component: SignUpComponent, canActivate: [authGuard]},
  {path: 'admin/flights', pathMatch: 'full', component: FlightManagementComponent, canActivate: [adminGuard]},
  {path: 'book-flight/:flightNumber', pathMatch: 'full', component: BookFlightComponent, canActivate: [authGuard]},
  {path: 'view-ticket', pathMatch: 'full', component: ViewBookingsComponent, canActivate: [authGuard]},
  {path: 'search-flights', pathMatch: 'full', component: SearchFlightsComponent, canActivate: [authGuard]},
  {path: 'logout', pathMatch: 'full', component: LogoutComponent, canActivate: [authGuard]},
  {path: '**', pathMatch: 'full', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
