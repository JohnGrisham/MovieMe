import { Plugins } from '@capacitor/core';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { bindCallback } from 'rxjs/observable/bindCallback';
import { map } from 'rxjs/operators/map';

import { Http } from '@angular/http';
import { AuthService } from '../services/auth.service';
import { MoviedatabaseService } from '../services/moviedatabase.service';
import { Movie } from '../shared/movie/movie.model';

import { UserLocation } from '../shared/location/userlocation.model';

import { Geolocation } from '@ionic-native/geolocation';
import { CacheService } from "ionic-cache";

@Injectable()
export class LocService {

  public nearbyTheaters;
  public mapsLoaded = false;

  coords: Coordinates;
  preciseLocation: UserLocation;
  location: {} = {city: null, state: null};
  zip: String;
  timezone;

  constructor(private http: Http, private auth: AuthService, private mdata: MoviedatabaseService, private geoloc: Geolocation, private cache: CacheService) {
    this.nearbyTheaters = [];
  }


  getLocation(): Promise<any> {
    if(this.auth.authenticated) {
      return this.geoloc.getCurrentPosition();
    }
  }

  getCoords(): Promise<any> {
    return new Promise((resolve, reject) => {
        this.getLocation().then(pos => {
          this.coords = pos.coords;
          resolve(pos.coords);
          console.log(this.coords);
          }
        );
    });
  }

  reverseGeocode(coordinates: Coordinates) {
    if(!coordinates) {
      return
    }

    return this.http.get(`http://www.mapquestapi.com/geocoding/v1/reverse?key=v6MTmZEFef30SZQH9AWSFlmKFpnM6Chz&location=${coordinates.latitude},${coordinates.longitude}&includeRoadMetadata=true&includeNearestIntersection=true`);
  }

  lookupLocation() {

    this.http.get(`http://www.mapquestapi.com/geocoding/v1/reverse?key=v6MTmZEFef30SZQH9AWSFlmKFpnM6Chz&location=${this.coords.latitude},${this.coords.longitude}&includeRoadMetadata=true&includeNearestIntersection=true`)
      .toPromise()
        .then(response => response = (<any>response).json().results)
          .then( (response) => response = this.arrayToObject(response).result)
            .then( (response) => this.arrayToObject(response.locations))
              .then( (response) => this.preciseLocation = response.result as UserLocation)
                .then(() =>  this.zipSearch())
                  .then(() => this.nearbyShows())
                    .then(() => this.timeZoneSearch(this.coords.latitude, this.coords.longitude, new Date()));
  }

  zipSearch(): Promise<any> {
    if(!this.preciseLocation) {
      return
    }

    return new Promise((resolve, reject) => {

    this.zip = (<any>this.preciseLocation.postalCode).substring(0, 5);
    this.http.get(`http://api.zippopotam.us/us/${this.zip}`)
      .toPromise()
        .then(response => this.arrayToObject(response.json().places))
          .then(response =>
                  {
                    let city = response.result["place name"]
                    let state = response.result["state"]

                    this.location['city'] = city
                    this.location['state'] = state
                  }), (err) => {
                      reject("Unable to find location");
                    };

                  resolve(true);
            });
  }

  timeZoneSearch(lat, long, date) {
    let timestamp = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    this.http.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${long}&key=AIzaSyBKM9opS6Z9K3HCe7mZzviapQyrpnfy_vw`)
      .toPromise()
        .then(response => console.log(response));
  }

  nearbyShows() {
    let nearbyShowings = [];
    let posterPromises = [];
    if(this.zip) {
    this.mdata.lookUpnearbyShows(this.zip).toPromise()
      .then(response => {
        const status = response.status;
        const contentLength = response._body.length;

        if(contentLength > 0 && status == 200) {
        for(let i in response.json()) {
          nearbyShowings.push(response.json()[i] as Movie);
          console.log(response.json()[i]);
        }
      } else {
        console.log("No Results");
        return;
      }
    }, (res) => console.log(res.status, res._body)).then(() => {
        for(let i in nearbyShowings) {
           posterPromises.push(resolvePosters(this.mdata.movieSearch(nearbyShowings[i].title.replace(/3D|2D/gi, '')),i));
          }

          Promise.all(posterPromises)
            .then(() => this.mdata.nearbyShowings = Object.assign([], nearbyShowings));
      });
    }

    function resolvePosters(obserable, number) {
      return new Promise((resolve, reject) => {
        obserable.toPromise()
          .then(result =>
            {
              if(result.json().results.length > 0) {
                nearbyShowings[number].poster_path = result.json().results[0].poster_path
                nearbyShowings[number].id = result.json().results[0].id
              }
              resolve();
          });
      });
    }
  }

  arrayToObject(array) {
   let object = array.reduce((obj, item) => {
     obj["result"] = item
     return obj
   }, {})

   return object;
 }
}
