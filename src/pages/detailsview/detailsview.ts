import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Movie } from '../../shared/movie/movie.model';
import { MoviedatabaseService } from '../../services/moviedatabase.service';

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
export class DetailsviewPage {

  private movie: Movie = this.navParams.data;
  private cast: Array<Object>;
  private popover: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mdata: MoviedatabaseService, private popOvrCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    this.mdata.movieDetails(this.movie.id)
      .toPromise()
        .then((res) =>
          {
            let details = res.json() as Movie;
            for (let key in details) {
              if(this.movie[key] == null || this.movie[key] == undefined) {
                this.movie[key] = details[key];
              }
            }
            this.cast = this.movie.credits.cast;
            console.log(this.movie);
          });
  }

  viewTrailer(movie) {
    this.popover = this.popOvrCtrl.create(ViewTrailerPage, movie, { cssClass: 'trailer-popover'});

    this.popover.present();
  }

  async imdbLink() {
    await Browser.open({ url: `https://www.imdb.com/title/${this.movie.imdb_id}`, presentationStyle: "fullscreen" });
  }
}
