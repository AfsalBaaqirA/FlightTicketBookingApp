import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Passenger } from 'src/app/models/booking';
import { Flight } from 'src/app/models/flight';
import { FlightService } from 'src/app/services/flight.service';
import { LoadingComponent } from '../loading/loading.component';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {
  flightNumber: string | null = '';
  flightService: FlightService;
  bookService: BookingService
  flightDetails!: Flight;
  passengerCount: number = 1;
  maxPassengerCount: number = 5;
  passengers: Passenger[] = [];
  classType: string = '';
  ticketPrice: number = 0;
  @ViewChild('loading', {static: true}) loading!: LoadingComponent;

  constructor(private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {
    this.bookService = inject(BookingService);
    this.flightService = inject(FlightService);
   }

  ngOnInit(): void {
    this.flightNumber = this.route.snapshot.paramMap.get('flightNumber');
    this.flightService.getFlightInfo(this.flightNumber!).subscribe((data: any) => {
      console.log(data);
      this.flightDetails = data.response.flight;
      console.log(this.flightDetails);
      if (this.flightDetails) {
        this.maxPassengerCount = Math.min(this.flightDetails.seatCount, this.maxPassengerCount);
        this.generatePassengers();
      }
    });
  }

  generatePassengers(): void {
    if (this.passengerCount > this.maxPassengerCount) {
      this.passengerCount = this.maxPassengerCount;
    }
    if (this.passengerCount > this.passengers.length){
      for (let i = this.passengers.length; i < this.passengerCount; i++) {
        this.passengers.push({
          name: '',
          dob: '',
          email: ''
        })
      }
    }
    if (this.passengerCount < this.passengers.length) {
      for (let i = this.passengerCount; i < this.passengers.length; i++) {
        this.passengers.pop()
      }
    }
  }

  bookFlight(): void {
    if (this.validate()){
      this.loading.showLoading('Booking flight...');
      this.bookService.bookFlight(this.flightNumber!, this.passengers, this.ticketPrice).subscribe((data: any) => {
        data = data.response;
        if (data.status == '200') {
          this.showToastr('Flight booked successfully! Redirecting...', 'success');
          this.router.navigate(['/view-ticket']);
        }
        else {
          this.showToastr(data.message, 'error');
        }
      });
    }
    else{
      this.showToastr('Please fill all the passenger details', 'warning');
    }
  }

  validate(): boolean {
    let isValid = true;
    this.passengers.forEach((passenger) => {
      if (passenger.name === '' || passenger.dob === '' || passenger.email === '') {
        isValid = false;
      }
    });
    return isValid;
  }

  onPassengerCountChange() {
    this.generatePassengers()
    this.calculateTicketPrice()
  }

  calculateTicketPrice() {
    if (this.flightDetails && this.classType) {
      const prices = this.flightDetails.price;
      prices.forEach((price) => {
        if (this.classType == price.priceType){
          this.ticketPrice = price.price * this.passengerCount;
          return;
        }
      });
    }
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
