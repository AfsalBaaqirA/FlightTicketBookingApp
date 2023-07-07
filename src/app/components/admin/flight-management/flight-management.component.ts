import { Component, inject, OnInit } from '@angular/core';
import { Flight } from 'src/app/models/flight';
import { FlightService } from 'src/app/services/flight.service';
import { Passenger } from 'src/app/models/booking';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-flight-management',
  templateUrl: './flight-management.component.html',
  styleUrls: ['./flight-management.component.css']
})
export class FlightManagementComponent implements OnInit {
  showFlights: boolean = true;
  newFlight: Flight;
  flightService: FlightService;
  flights!: Flight[];
  links: { name: string, url: string }[] = [
    { name: 'Home', url: '' },
    { name: 'Logout', url: '/logout' }
  ];
  airports: string[] = [
    "DEL, Indira Gandhi International Airport",
    "BOM, Chhatrapati Shivaji Maharaj International Airport",
    "BLR, Kempegowda International Airport",
    "MAA, Chennai International Airport",
    "HYD, Rajiv Gandhi International Airport",
    "CCU, Netaji Subhash Chandra Bose International Airport",
    "COK, Cochin International Airport",
    "GOI, Goa International Airport",
    "AMD, Sardar Vallabhbhai Patel International Airport",
    "PNQ, Pune Airport",
    "IXC, Chandigarh International Airport",
    "JAI, Jaipur International Airport",
    "ATQ, Sri Guru Ram Dass Jee International Airport",
    "IXM, Madurai International Airport",
    "IXR, Birsa Munda Airport",
    "IXB, Bagdogra Airport",
    "VGA, Vijayawada International Airport",
    "PAT, Jay Prakash Narayan International Airport",
    "TRV, Trivandrum International Airport",
    "IXA, Agartala Airport",
    "IXZ, Veer Savarkar International Airport",
    "IXL, Kushok Bakula Rimpochee Airport",
    "IXE, Mangalore International Airport",
    "IXJ, Jammu Airport",
    "IXU, Aurangabad Airport",
    "IXW, Sonari Airport",
    "IXY, Kandla Airport",
    "IXT, Pasighat Airport",
    "IXS, Silchar Airport",
    "STV, Surat Airport",
    "HJR, Khajuraho Airport",
    "JDH, Jodhpur Airport",
    "TRZ, Tiruchirappalli International Airport",
    "IXH, Kailashahar Airport",
    "VTZ, Visakhapatnam International Airport",
    "RPR, Swami Vivekananda Airport",
    "IMF, Imphal International Airport",
    "IXY, Kandla Airport",
    "CJB, Coimbatore International Airport",
    "IXZ, Veer Savarkar International Airport",
    "BHO, Raja Bhoj International Airport",
    "IXV, Pasighat Airport",
    "BBI, Biju Patnaik International Airport",
    "BHR, Bharatpur Airport",
    "IXL, Kushok Bakula Rimpochee Airport",
    "IXS, Silchar Airport",
    "VTZ, Visakhapatnam International Airport",
    "BBI, Biju Patnaik International Airport",
    "PNY, Pondicherry Airport",
    "DED, Dehradun Airport",
    "BHU, Bhavnagar Airport",
    "GWL, Gwalior Airport",
    "IXC, Chandigarh International Airport",
    "HBX, Hubli Airport",
    "IXR, Birsa Munda Airport",
    "RPR, Swami Vivekananda Airport",
    "UDR, Maharana Pratap Airport",
    "CCJ, Calicut International Airport",
    "LKO, Chaudhary Charan Singh International Airport",
    "IXU, Aurangabad Airport",
    "TRV, Trivandrum International Airport",
    "DIB, Dibrugarh Airport",
    "VNS, Lal Bahadur Shastri International Airport",
    "BHJ, Bhuj Airport",
    "VNS, Lal Bahadur Shastri International Airport",
    "IXY, Kandla Airport"];

  constructor(private toastr: ToastrService) {
    this.flightService = inject(FlightService);
    this.newFlight = {
      flightNumber: '',
      date: '',
      time: '',
      seatCount: 60,
      from: '',
      to: '',
      price: [
        { id: '0', price: 0, priceType: 'Economy'},
        { id: '1', price: 0, priceType: 'Business'},
        { id: '2', price: 0, priceType: 'First Class'}
      ],
      duration: '',
      airplane: '',
      gate: '',
      terminal: '',
      passengers: []
    }
  }

  ngOnInit(): void {
    this.getFlights();;
  }

  getFlights(): void {
    this.flightService.getFlights().subscribe((data: any) => {
      data = data.response;
      if (data.status === '200') {
        this.flights = data.flights;
      }
    });
  }

  addFlight(): void {
    console.log(this.newFlight);
    this.flightService.addFlight(this.newFlight).subscribe((data: any) => {
      data = data.response;
      if (data.status === '200') {
        this.getFlights();
        this.showFlights = true;
        this.toastr.success('Flight added successfully');
      }
    });
  }

  removeFlight(flightNumber: string): void {
    this.flightService.removeFlight(flightNumber).subscribe((data: any) => {
      data = data.response;
      if (data.status === '200') {
        this.getFlights();
        this.toastr.success('Flight removed successfully');
      }
    });
  }
}
