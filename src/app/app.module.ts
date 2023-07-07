import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { ViewBookingsComponent } from './components/view-bookings/view-bookings.component';
import { SearchFlightsComponent } from './components/search-flights/search-flights.component';
import { BookFlightComponent } from './components/book-flight/book-flight.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { FlightManagementComponent } from './components/admin/flight-management/flight-management.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    LoadingComponent,
    NavbarComponent,
    SignUpComponent,
    ViewBookingsComponent,
    SearchFlightsComponent,
    BookFlightComponent,
    LogoutComponent,
    FlightManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      disableTimeOut: false,
      tapToDismiss: true,
      newestOnTop: true,
      extendedTimeOut: 1000,
      easeTime: 200
    }),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
