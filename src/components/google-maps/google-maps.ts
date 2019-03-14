import { Component, Input, Renderer2, ElementRef, Inject, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Plugins } from '@capacitor/core';
import {} from '@types/googlemaps';

import { LocService } from '../../services/loc.service';

import { Place } from '../../shared/place/place.model';

const { Geolocation, Network } = Plugins;

@Component({
  selector: 'google-map',
  templateUrl: 'google-maps.html'
})
export class GoogleMapComponent implements AfterViewInit {

    @Input('apiKey') apiKey: string;

    public map: any;
    public markers: any[] = [];
    private networkHandler = null;
    private service;

    private scriptAppended = false;

    constructor(private renderer: Renderer2, private element: ElementRef, @Inject(DOCUMENT) private _document, private loc: LocService){

    }

     ngAfterViewInit() {
       this.init().then((res) => {
          console.log("Google Maps ready.");
          this.addMarker(this.loc.coords.latitude, this.loc.coords.longitude);
      }, (err) => {
          console.log(err);
      });
    }

    private init(): Promise<any> {

        return new Promise((resolve, reject) => {

            this.loadSDK().then((res) => {

                  this.initMap().then((res) => {
                    resolve(true);
                }, (err) => {
                    reject(err);
                });
            }, (err) => {

                reject(err);

            });
        });

    }

    private loadSDK(): Promise<any> {

        console.log("Loading Google Maps SDK");

        return new Promise((resolve, reject) => {

            if(!this.loc.mapsLoaded){

                Network.getStatus().then((status) => {

                    if(status.connected){

                        this.injectSDK().then((res) => {
                            resolve(true);
                        }, (err) => {
                            reject(err);
                        });

                    } else {

                        if(this.networkHandler == null){

                            this.networkHandler = Network.addListener('networkStatusChange', (status) => {

                                if(status.connected){

                                    this.networkHandler.remove();

                                    this.init().then((res) => {
                                        console.log("Google Maps ready.")
                                    }, (err) => {
                                        console.log(err);
                                    });

                                }

                            });

                        }

                        reject('Not online');
                    }

                }, (err) => {

                    // NOTE: navigator.onLine temporarily required until Network plugin has web implementation
                    if(navigator.onLine){

                        this.injectSDK().then((res) => {
                            resolve(true);
                        }, (err) => {
                            reject(err);
                        });

                    } else {
                        reject('Not online');
                    }

                });

            } else {
                reject('SDK already loaded');
            }

        });


    }

    private injectSDK(): Promise<any> {

        return new Promise((resolve, reject) => {

            window['mapInit'] = () => {
                this.loc.mapsLoaded = true;
                resolve(true);
            }

            let script = this.renderer.createElement('script');
            script.id = 'googleMaps';

            if(this.apiKey){
                script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit&libraries=places';
            } else {
                console.log("API Not provided");
            }

            this.renderer.appendChild(this._document.body, script);
        });

    }

    private initMap(): Promise<any> {

        return new Promise((resolve, reject) => {

            this.loc.getCoords().then((position) => {

                console.log(position);

                let latLng = new google.maps.LatLng((<Coordinates>position).latitude, (<Coordinates>position).longitude);

                let mapOptions = {
                    center: latLng,
                    zoom: 15
                };

                this.map = new google.maps.Map(this.element.nativeElement, mapOptions);

                this.service = new google.maps.places.PlacesService(this.map);

                this.service.nearbySearch({
                    location: latLng,
                    radius: 5000,
                    keyword: ["movie", "theater", "cinema"]
                  }, (response, status) => {this.confirmResultsCreateMarkers(response, status)});

                console.log("Map initialised");
                resolve(true);

            }, (err) => {

                reject('Could not initialise map');

            });

        });

    }


    public addMarker(lat: number, lng: number): void {

        let latLng = new google.maps.LatLng(lat, lng);

        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng
        });

        this.markers.push(marker);

    }

    public createMarker(place, map) {
       var placeLoc = place.geometry.location;
       var marker = new google.maps.Marker({
         map: map,
         position: place.geometry.location
       });

       this.markers.push(marker);
   }

    private confirmResultsCreateMarkers(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            this.createMarker(results[i], this.map);
            this.service.getDetails({
              placeId: `${results[i].place_id}`,
              fields: ['name', 'rating', 'formatted_phone_number', 'website'] },
                (response, status) => this.confirmResultsSearchDetails(response, status));
          }
        }
      }

    private confirmResultsSearchDetails(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.loc.nearbyTheaters.push(place as Place);
        console.log();
      }
    }
}
