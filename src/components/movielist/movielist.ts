import { Component, Directive, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsviewPage } from '../../pages/detailsview/detailsview';

import { Movie } from '../../shared/movie/movie.model';

/**
 * Generated class for the MovielistComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'movie-list',
  templateUrl: 'movielist.html'
})
@Directive({
  selector: '[movies]'// Attribute selector
})
export class MovielistComponent {

  @Input('movies') movies: Movie[];

  constructor(private navCtrl: NavController) {

  }

  pushDetails(movie) {
    this.navCtrl.push(DetailsviewPage, movie);
  }

}
