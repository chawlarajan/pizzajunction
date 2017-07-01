import { Component } from '@angular/core';
import { Location, GeoLocation } from './location';
import { MapService } from './map.service';

@Component({
  selector: 'my-app',
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent  {
  pointA: GeoLocation = null;
  pointB: GeoLocation = {
    lat: 49.054765,
    long: -122.325902
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

  constructor(private mapSVC: MapService){}

  searchLocation() {
    this.mapSVC.searchLocation(this.location)
    .then((pointA: GeoLocation) => {
      this.pointA = pointA;
    });
  }

  getDistance() {
    this.mapSVC.getDistance(this.pointA, this.pointB)
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
    this.pointA = null;
    this.location.street = '';
    this.location.suite = '';
    this.location.zip = '';
    this.distance = 0;
  }

 }
