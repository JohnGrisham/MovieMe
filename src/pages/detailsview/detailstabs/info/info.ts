import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  title: string;
  overview: string;
  longDescription: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title = this.navParams.get('title');
    this.overview = this.navParams.get('overview');
    this.longDescription = this.navParams.get('longDescription');
  }

  ionViewDidLoad() {

  }

}
