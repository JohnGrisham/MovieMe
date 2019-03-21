import { Component, OnInit, Directive, Input, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Slides, NavController, Platform, Refresher, RefresherContent } from 'ionic-angular';
import { Movie } from '../../shared/movie/movie.model';
import { Genre } from '../../shared/genre/genre.model';
import { DetailsviewPage } from '../../pages/detailsview/detailsview';
import { MoviedatabaseService } from '../../services/moviedatabase.service';

@Component({
  selector: 'movie-slider',
  templateUrl: './movieslider.html'
})
@Directive({
  selector: '[movies], [showGenres]'// Attribute selector
})
export class MovieSliderComponent implements AfterViewInit {

  @Input('movies') movies: Movie[];
  @Input('showGenres') genreDisplay: Boolean = false;

  @ViewChild('Slides') slider: Slides;

  private checkInitalOverflow = false;
  private screenResized = false;

  constructor(private navCtrl: NavController, private mdata: MoviedatabaseService, private cd: ChangeDetectorRef, private platform: Platform) {

  }

  pushDetails(movie) {
    this.navCtrl.push(DetailsviewPage, movie);
  }

  ngAfterViewInit() {
        this.slider.loop = true;
        this.slider.centeredSlides = true;
        
        this.setSlidesPerView();

        this.platform.resize.subscribe(() => {
        this.screenResized = true;

        this.setSlidesPerView();

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

 setSlidesPerView() {

   if(this.platform.width() >= 1600) {
     setslides(this.slider, 5);
   }

   else if(this.platform.width() >= 1000 && this.platform.width() < 1600) {
     setslides(this.slider, 3);
   }

   else if(this.platform.width() < 1000) {
     setslides(this.slider, 1);
   }

   function setslides(slider: Slides, numSlides: Number) {
     slider.slidesPerView = numSlides;
     slider.resize();
     slider.update();
   }

   this.cd.detectChanges();
 }
}
