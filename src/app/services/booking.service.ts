import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Passenger } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'https://flightticketbookingserver.onrender.com/api/flight';

  constructor(private http: HttpClient) { }

  bookFlight(flightNumber: string, passengers: Passenger[], ticketPrice: number): Observable<any> {
    const bookingData = {
      'flightNumber': flightNumber,
      'passengers': passengers,
      'ticketPrice': ticketPrice
    };
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/book/${token}`, bookingData);
  }

  getMyBookings(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/myBookings/${token}`);
  }

  cancelTicket(ticketNumber: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}/cancelTicket/${token}/${ticketNumber}`);
  }
}
