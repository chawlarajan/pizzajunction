import { Injectable } from '@angular/core';
import { Location, GeoLocation } from './location';
declare var google: any;

export interface IMap {
    searchLocation: (location: Location) => Promise<GeoLocation>;
    getDistance: (pointA: GeoLocation, pointB: GeoLocation) => Promise<number>;
}

@Injectable()
export class MapService implements IMap {
    geocoder: any;
   
    constructor() {
        this.geocoder = new google.maps.Geocoder();
     }

    public searchLocation(location: Location): Promise<GeoLocation> {
       let pointA: GeoLocation;
       const address = location.street + ' ' + location.suite +  ' ' + location.city +  ' ' + location.state
        +  ' ' + location.country +  ' ' + location.zip;

        return new Promise<GeoLocation>((resolve: any, reject: any) => {
             this.geocoder.geocode({'address': address}, (results: any, status: any) => {
                if (status == google.maps.GeocoderStatus.OK) {
                    var r = results[0].geometry.location;
                    resolve(pointA = {
                        lat: r.lat(),
                        long: r.lng()
                    });
                } else {
                    reject(status);
                }
             });
        });
    }
 

    public getDistance(p1: GeoLocation, p2: GeoLocation):Promise<number> {
        var service = new google.maps.DistanceMatrixService;
        
        return new Promise<number>((resolve: any, reject: any) => {
            service.getDistanceMatrix({
            origins: [{lat: p1.lat, lng: p1.long}],
            destinations: [{lat: p2.lat, lng: p2.long}],
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.METRIC
            }, (results: any, status: any) => {
                if (status == google.maps.GeocoderStatus.OK) {
                    var r = results.rows[0].elements[0].distance.value;
                    resolve(r/1000);
                } else {
                     reject(status);
                }
            });
        });
    };

    
}