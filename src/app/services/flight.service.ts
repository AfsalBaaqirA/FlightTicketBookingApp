import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight, FlightSearch } from '../models/flight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private apiUrl = 'http://192.168.1.96:5000/api/flights';

  constructor(private http: HttpClient) { }

  searchFlights(flightSearch: FlightSearch): Observable<any> {
    return this.http.post(`${this.apiUrl}/search`, flightSearch);
  }

  getFlightInfo(flightNumber: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${flightNumber}`);
  }

  getFlights(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/${token}`);
  }

  addFlight(flight: Flight): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/add/${token}`, flight);
  }

  removeFlight(flightNumber: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}/remove/${token}/${flightNumber}`);
  }

}