import { Component, Directive, Input, AfterViewInit, ViewChildren } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Movie } from '../../../shared/movie/movie.model';

/**
 * Generated class for the DetailstabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailstabs',
  templateUrl: 'detailstabs.html'
})
@Directive({
  selector: '[movie]'
})
export class DetailstabsPage implements AfterViewInit {

  @Input('movie') movie: Movie;

  infoRoot = 'InfoPage';
  castRoot = 'CastPage'
  reviewsRoot = 'ReviewsPage'
  commentsRoot = 'CommentsPage'
  relatedRoot = 'RelatedPage'

  constructor(public navCtrl: NavController) {

  }

  ngAfterViewInit() {

  }

  moveTab(event, el) {
    const index = el.index;

    if(event.direction === 4 && index < 4) {
     this.navCtrl.getActiveChildNavs()[0].select(index + 1);
   } else if(event.direction === 2 && index > 0) {
     this.navCtrl.getActiveChildNavs()[0].select(index - 1);
   }
  }
}
