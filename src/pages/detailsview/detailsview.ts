import { Component, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { IonicPage, NavController, NavParams, PopoverController, IonicPageModule } from 'ionic-angular';
import { Movie } from '../../shared/movie/movie.model';
import { MoviedatabaseService } from '../../services/moviedatabase.service';
import { PlatformService } from '../../services/platform.service';

import { ViewTrailerPage } from '../../pages/viewtrailer/viewtrailer';

const { Browser } = Plugins;

/**
 * Generated class for the DetailsviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailsview',
  templateUrl: 'detailsview.html',
})
export class DetailsviewPage implements AfterViewInit {

  private movie: Movie = this.navParams.data;
  private cast: Array<Object>;

  private popover: any;

  // The global instance of space to replace spaces in ratings
  private spaceRegex = / /g;

  private aggregateRating = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mdata: MoviedatabaseService, private popOvrCtrl: PopoverController, private cd: ChangeDetectorRef, private pltSer: PlatformService) {

  }

  ionViewDidLoad() {
    this.mdata.movieDetails(this.movie.id)
      .toPromise()
        .then((res) =>
          {
            parseDetails(res, this.movie);
            this.cast = this.movie.credits.cast;
            }).then(() => this.mdata.getOMDB(this.movie.imdb_id)
                .toPromise()
                  .then((res) => {
                    parseDetails(res, this.movie);
                      }).then(() => {
                        this.movie.Ratings = this.movie.Ratings.filter(rt => rt['Source'] && rt['Value'] != 0);
                        this.movie.Ratings.forEach(rt => {
                          let formatted = rt['Value'].replace(/\/100|\/10|\%/g, '')
                          formatted.length === 1 ? formatted = parseInt(formatted) * 10 : formatted = parseInt(formatted.replace(/\./, ''));
                          this.aggregateRating += formatted;
                        });
                      }).then(() => {
                        if(this.movie.vote_average.toString)
                        this.aggregateRating += this.movie.vote_average.toString().length === 1 ? this.movie.vote_average * 10 : parseInt(this.movie.vote_average.toString().replace(/\./g, ''));
                          let tmdbRating = 0;
                          if(this.movie.vote_average && this.movie.vote_average != 0) {
                            tmdbRating++;
                          }
                          this.aggregateRating = this.aggregateRating / (this.movie.Ratings.length + tmdbRating);
                        }));

              function parseDetails(res, movie) {
                let details;
                res.headers ? details = res.json() as Movie : details = res as Movie;
                for (let key in details) {
                  if(movie[key] == null || movie[key] == undefined) {
                    movie[key] = details[key];
                  }
                }
              }
  }

  ngAfterViewInit() {

  }

  viewTrailer(movie) {
    this.popover = this.popOvrCtrl.create(ViewTrailerPage, movie, { cssClass: 'trailer-popover'});

    this.popover.present();
  }

  async linkToTitle(source) {
    let src = source.toString();
    let link = null;

    switch(src) {
      case "tmdb": {
        link = 'https://www.themoviedb.org/movie/' + this.movie.id;
        break;
      }
      case "Internet Movie Database": {
        link = this.movie.imdburl;
        break;
      }
      case "Rotten Tomatoes": {
        link = 'https://www.rottentomatoes.com/m/' + this.movie.title.replace(/[^\w\s]/gi, '').replace(/ /g, '_').toLowerCase();
        break;
      }
      case "Metacritic": {
        link = 'https://www.metacritic.com/movie/' + this.movie.title.replace(/[^\w\s]/gi, '').replace(/ /g, '-').toLowerCase();
        break;
      }
      default: {
        link = null;
      }
    }
    if(link) { await Browser.open({ url: link, presentationStyle: "fullscreen" }); }
  }
}
