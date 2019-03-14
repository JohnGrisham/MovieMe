import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { MoviedatabaseService } from '../../../../services/moviedatabase.service';
import { InfiniteScrollService } from '../../../../services/infinite-scroll.service';

import { Movie } from '../../../../shared/movie/movie.model';

/**
 * Generated class for the PopularPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popular',
  templateUrl: 'popular.html',
})
export class PopularPage {

  private movies: Movie[] = [];
  private page = 1;
  private pages: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mdata: MoviedatabaseService, private scroll: InfiniteScrollService) {

  }

  ionViewDidLoad() {
    this.mdata.discover('sort_by=popularity.desc')
      .toPromise()
        .then((res) => {
          this.movies = res.json().results as Movie[];
          this.pages = res.json().total_pages;
        });
  }

  loadMore(infiniteScroll) {
    this.page++;

    if(this.page <= this.pages) {
      this.scroll.getPageNumber(this.mdata.discover('sort_by=popularity.desc', this.page), infiniteScroll, this.movies, this.page, this.pages)
        .then((res) => {
          this.movies = res;

          if (infiniteScroll) {
              infiniteScroll.complete();
          }
        });
      } else {
        return;
      }
   }
}
