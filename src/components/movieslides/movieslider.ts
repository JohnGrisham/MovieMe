import { Component, OnInit, Directive, Input, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Slides, NavController, Platform, Refresher, RefresherContent } from 'ionic-angular';
import { Movie } from '../../shared/movie/movie.model';
import { Genre } from '../../shared/genre/genre.model';
import { DetailsviewPage } from '../../pages/detailsview/detailsview';
import { MoviedatabaseService } from '../../services/moviedatabase.service';

import { MyApp } from '../../../src/app/app.component';

@Component({
  selector: 'movie-slider',
  templateUrl: './movieslider.html'
})
@Directive({
  selector: '[movies], [showGenres], [slidesPerView]'// Attribute selector
})
export class MovieSliderComponent implements AfterViewInit {

  @Input('movies') movies: Movie[];
  @Input('showGenres') genreDisplay: Boolean = false;
  @Input('slidesPerView') slidesPerView: number = 3;

  @ViewChild('Slides') slides: Slides;

  private checkInitalOverflow = false;
  private screenResized = false;

  private centered: boolean = true;

  constructor(private navCtrl: NavController, private mdata: MoviedatabaseService, private cd: ChangeDetectorRef, private platform: Platform) {

  }

  pushDetails(movie) {
    this.navCtrl.push(DetailsviewPage, movie);
  }

  ngAfterViewInit() {
        this.platform.resize.subscribe(() => {
        this.screenResized = true;

      });

      this.cd.detectChanges();
    }

  setGenreName(genre: Genre) {
    for(var x = 0; x < this.mdata.genreList.length; x++) {
      if(genre.id == this.mdata.genreList[x].id) {
        genre.name = this.mdata.genreList[x].name;
        return genre.name;
      }
    }
  }

  checkOverflow (element1, element2) {
    if(!this.checkInitalOverflow || this.screenResized) {
      this.checkInitalOverflow = true;
      return element1.scrollHeight > element2.clientHeight || element1.scrollWidth > element2.clientWidth;
    }
 }
}
