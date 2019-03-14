import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoviedatabaseService } from '../../../../services/moviedatabase.service';

import { Movie } from '../../../../shared/movie/movie.model';

/**
 * Generated class for the TopratedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-toprated',
  templateUrl: 'toprated.html',
})
export class TopratedPage {

  private movies: Movie[] = [];
  private page = 1;
  private pages: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mdata: MoviedatabaseService) {
  }

  ionViewDidLoad() {
    this.mdata.topRated()
      .toPromise()
        .then((res) => {
          this.movies = res.json().results as Movie[];
          this.pages = res.json().total_pages;
        });
  }

  getPageNumber(infiniteScroll) {
    this.mdata.topRated(this.page)
    .subscribe(res => {
      this.movies = this.movies.concat(res.json().results as Movie[]);
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
    })
  }

  loadMore(infiniteScroll) {
    this.page++;
    this.getPageNumber(infiniteScroll);

    if (this.page === this.pages) {
      infiniteScroll.enable(false);
    }
  }
}
