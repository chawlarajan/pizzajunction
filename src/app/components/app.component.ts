import { Component } from '@angular/core';
import { Location, GeoLocation } from './location';
import { MapService } from './map.service';

@Component({
  selector: 'my-app',
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent  {
  destination: GeoLocation = null;
  origin: GeoLocation = {
    lat: 49.054765,
    lng: -122.325902
  };

  pageTitle = 'Location Search';
  location: Location = {
    street: 'King George Hwy',
    suite: '1160',
    city: 'Surrey',
    state: 'British Columbia',
    country: 'Canada',
    zip: 'V4A4Z2'
  };
  distance: number = 0;
  errorMessage: string;

  constructor(private mapSVC: MapService){}

  searchLocation() {
    this.mapSVC.searchLocation(this.location)
    .then((geoLocation: GeoLocation) => {
      this.destination = geoLocation;
    })
    .catch((message: string) => {
      this.showMessage(message);
    });
  }

  showMessage(message: string) {
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = "", 5000);
  }

  getDistance() {
    this.mapSVC.getDistance(this.origin, this.destination)
    .then((distance: number) => {
      this.distance = distance;
    });
  }

  isValid() {
    return this.location.street !== '' 
            && this.location.suite !== '' 
            && this.location.zip !== '';
  }

  clear() {
    this.destination = null;
    this.location.street = '';
    this.location.suite = '';
    this.location.zip = '';
    this.distance = 0;
  }

 }
