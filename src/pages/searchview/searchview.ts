import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoviedatabaseService } from '../../services/moviedatabase.service';
import { DetailsviewPage } from '../../pages/detailsview/detailsview';

/**
 * Generated class for the SearchviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searchview',
  templateUrl: 'searchview.html',
})
export class SearchviewPage {

  private titleQuery: string;
  private sendBackCurrent: Function;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mdata: MoviedatabaseService) {
    this.titleQuery = this.navParams.get('Query');
    this.sendBackCurrent  = this.navParams.get('Callback');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchviewPage');
  }

  ionViewDidLeave() {
    this.sendBackCurrent(this.titleQuery);
  }

  pushDetails(movie) {
    this.navCtrl.push(DetailsviewPage, movie);
  }
}
