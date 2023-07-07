import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Flight, FlightSearch } from 'src/app/models/flight';
import { FlightService } from 'src/app/services/flight.service';


@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css']
})
export class SearchFlightsComponent {
  flightService: FlightService;
  flightSearch!: FlightSearch;
  links: { name: string, url: string }[] = [
    { name: 'Home', url: '' },
    { name: 'My Bookings', url: '/view-ticket'},
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
  passengers = 1;
  from = '';
  to = '';
  departure = '';
  showFlights = false;
  flightList: Flight[] = [];


  constructor(private router: Router, private toastr: ToastrService) {
    this.flightService = inject(FlightService);
  }

  searchFlights() {
    if (this.validate()) {
      this.flightSearch = {
        from: this.from,
        to: this.to,
        date: this.departure,
        passengers: this.passengers
      }
      this.flightService.searchFlights(this.flightSearch).subscribe((res: any) => {
        res = res.response;
        if (res.status == '200') {
          this.flightList = res.flights;
          this.showFlights = true;
        }
        else {
          this.showToastr(res.message, 'error');
        }
      });
    }
  }

  validate(): boolean {
    if (this.from === '') {
      this.showToastr('Please select departure airport', 'warning');
      return false;
    }
    else if (this.to === '') {
      this.showToastr('Please select arrival airport', 'warning');
      return false;
    }
    else if (this.from === this.to) {
      this.showToastr('Departure and arrival airports cannot be same', 'warning');
      return false;
    }
    else if (this.departure === '') {
      this.showToastr('Please select departure date', 'warning');
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

  showFlightDetails(flightNumber: string) {
    this.router.navigate(['/book-flight', flightNumber]);
  }

  backToSearch() {
    this.showFlights = false;
    this.from = '';
    this.to = '';
    this.departure = '';
    this.passengers = 1;
    this.flightList = [];
  }
}
