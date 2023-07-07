import { Component, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent implements OnInit {
  ticketList!: Ticket[];
  bookService: BookingService;
  showTicket: boolean = false;
  ticket!: Ticket;
  links: { name: string, url: string }[] = [
    { name: 'Home', url: '' },
    { name: 'Search Flights', url: '/search-flights'},
    { name: 'Logout', url: '/logout' }
  ];

  constructor (private toastr: ToastrService) {
    this.bookService = inject(BookingService)
  }

  ngOnInit(): void {
    this.bookService.getMyBookings().subscribe((data: any) => {
      data = data.response;
      this.ticketList = data.bookings;
    });
  }

  showTicketDetails(ticketNumber: string) {
    this.ticket = this.ticketList.find(ticket => ticket.ticketNumber === ticketNumber)!;
    this.showTicket = true;
  }

  cancelTicket(ticketNumber: string) {
    this.bookService.cancelTicket(ticketNumber).subscribe((data: any) => {
      data = data.response;
      if (data.status === '200'){
        this.showToastr("Ticket Cancelled Successfully", "success")
        this.ngOnInit();
      }
      else if (data.status === '400')
        this.showToastr(data.message, "error");
    });
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
