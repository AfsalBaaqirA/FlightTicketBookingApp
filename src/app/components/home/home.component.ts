import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  reviews = [
    {
      quote: "I recently used the flight booking app and it was a great experience. The app is easy to navigate, and I found the best deals for my trip. Highly recommended!",
      image: "https://th.bing.com/th/id/OIP.SzixlF6Io24jCN67HHZulAAAAA?pid=ImgDet&rs=1",
      name: "John Doe",
      role: "Traveler"
    },
    {
      quote: "The flight booking app exceeded my expectations. It provided me with a seamless booking process, and I received instant confirmation for my flights. Amazing app!",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      name: "Jane Smith",
      role: "Traveler"
    },
    {
      quote: "I highly recommend the flight booking app. It made finding and booking flights a breeze. The app's user-friendly interface and comprehensive search options made my travel planning effortless.",
      image: "https://th.bing.com/th/id/OIP.xMv5SgiEU1Ry7KhU67ASGgAAAA?pid=ImgDet&w=427&h=640&rs=1",
      name: "Mike Johnson",
      role: "Traveler"
    }
  ];

  links: { name: string, url: string }[] = [
    { name: 'Login', url: '/login' }
  ];

  popularDestinations: { name: string, imgSrc: string }[] = [
    { name: 'London', imgSrc: 'London.png' },
    { name: 'Paris', imgSrc: 'Paris.png' },
    { name: 'New York', imgSrc: 'New York.png' },
    { name: 'Tokyo', imgSrc: 'Tokyo.png' },
    { name: 'Rome', imgSrc: 'Rome.png' },
    { name: 'Dubai', imgSrc: 'Dubai.png' },
    { name: 'Barcelona', imgSrc: 'Barcelona.png' },
    { name: 'Istanbul', imgSrc: 'Istanbul.png' },
    { name: 'Amsterdam', imgSrc: 'Amsterdam.png' },
    { name: 'Milan', imgSrc: 'Milan.png' },
    { name: 'Hong Kong', imgSrc: 'Hong Kong.png' },
    { name: 'Taipei', imgSrc: 'Taipei.png' },
  ];

  year!: number;

  @ViewChild('loading', { static: true }) loading!: LoadingComponent;

  ngOnInit(): void {
    this.year = new Date().getFullYear();
    this.loading.showLoading("Loading...");
    setTimeout(() => {
      this.loading.hideLoading();
    }, 1000);
  }
}
