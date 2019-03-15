import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NavController, NavOptions, IonicPage, Slides, Platform } from 'ionic-angular';
import { Plugins } from '@capacitor/core';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Movie } from '../../shared/movie/movie.model';
import { UserLocation } from '../../shared/location/userlocation.model';
import { AuthService } from '../../services/auth.service';
import { LocService } from '../../services/loc.service';
import { MoviedatabaseService } from '../../services/moviedatabase.service';
import { LoginPage } from '../login/login';
import { GenresPage } from '../genres/genres';
import { GoogleMapComponent } from '../../components/google-maps/google-maps';
import { MovieSliderComponent } from '../../components/movieslides/movieslider';

const { Browser } = Plugins;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements AfterViewInit {

  private locationSearched: Boolean = false;
  private suggestionsTemporary: Movie[] = [];
  private slidesPerView: number = 3;

  constructor(public navCtrl: NavController, private http: Http, private auth: AuthService, private loc: LocService, private mdata: MoviedatabaseService, private cd: ChangeDetectorRef, private platform: Platform) {

    if(this.auth.authenticated) {

      this.mdata.getGenreIds()
        .toPromise()
          .then(res => this.mdata.genreList = res.json().genres)
            .then(() => this.getNowPlaying());

            if(this.auth.genres && this.mdata.genreList) {
              if(this.auth.genres.length < 1) {
                this.navCtrl.push(GenresPage);
              }
            }

            this.loc.getCoords()
              .then(() => this.loc.lookupLocation());

              let resultsSliced;

              for(var x = 0; x < this.auth.genres.length; x++) {
                this.mdata.genreSuggestions(this.auth.genres[x])
                  .toPromise()
                    .then((res) => {
                      resultsSliced = res.json().results.slice(0, 10);
                      resultsSliced.forEach(
                        res => this.filterContent(res, this.mdata));
                    }).then(() => this.mdata.suggestedByGenre = this.suggestionsTemporary);
              }

    } else {
      this.navCtrl.setRoot(LoginPage);
    }
  }

  ngAfterViewInit() {
    this.platform.resize.subscribe(() => {

    this.setSlidesPerView();

    });
        this.cd.detectChanges();
    }

  ionViewDidLoad() {
    this.setSlidesPerView();
  }

  getNowPlaying() {
    this.mdata.nowPlaying().toPromise()
      .then(response => {
        for(var x = 0; x < response.json().results.length; x++) {
          this.mdata.inTheatres.push(new Movie(response.json().results[x]));
        }
      });
  }

  async linkToTheatre(theatre) {
    await Browser.open({ url: `${theatre.website}`, presentationStyle: "fullscreen" });
  }

    arrayToObject(array) {
     let object = array.reduce((obj, item) => {
       obj["result"] = item
       return obj
     }, {})

     return object;
   }

   filterContent(res, mdataService) {
     return new Promise((resolve, reject) => {
     mdataService.movieDetails(res.id).toPromise()
       .then((details) => {
           let keywords = [];

           if(details.json()['keywords']['keywords'].length > 0)
           { details.json()['keywords']['keywords'].forEach(item => keywords.push(item.name)); }

           let redflaged = mdataService.screenKeyWords(keywords);
             if(!redflaged && !(details.json()['vote_average'] == 0 || details.json()['overview'] == "" || details.json()['poster_path'] == null)) {
               this.suggestionsTemporary.push(details.json() as Movie);
               console.log(details.json());
             }
             resolve();
       });
   });
   }

   setSlidesPerView() {
     // On a desktop, and is wider than 1200px
     if(this.platform.width() > 768) {
       this.slidesPerView = 3;
     } else {
       this.slidesPerView = 1;
     }
   }
}
