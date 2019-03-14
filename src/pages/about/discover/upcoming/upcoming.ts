import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoviedatabaseService } from '../../../../services/moviedatabase.service';

import { Movie } from '../../../../shared/movie/movie.model';
import { DatePipe } from '@angular/common';


/**
 * Generated class for the UpcomingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upcoming',
  templateUrl: 'upcoming.html',
})
export class UpcomingPage {

  private movies: Movie[] = [];
  private page = 1;
  private pages: number;

  private sorting: string;

  private date: string;
  private oneMonthAheadToday: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mdata: MoviedatabaseService, private datePipe: DatePipe) {
    this.date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    this.oneMonthAheadToday = this.datePipe.transform(Date.now() + 2.628e+9, 'yyyy-MM-dd');

    this.sorting = `primary_release_date.gte=${this.date}&primary_release_date.lte=${this.oneMonthAheadToday}&sort_by=popularity.desc`;
  }

  ionViewDidLoad() {
    this.mdata.discover(this.sorting)
      .toPromise()
        .then((res) => {
          this.movies = res.json().results as Movie[];
          this.pages = res.json().total_pages;
        });
  }

  getPageNumber(infiniteScroll) {
    this.mdata.discover(this.sorting, this.page)
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
