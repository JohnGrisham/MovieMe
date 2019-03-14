import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Movie } from '../../shared/movie/movie.model';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the ViewtrailerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewtrailer',
  templateUrl: 'viewtrailer.html',
})
export class ViewTrailerPage {

  private movie: Movie = this.navParams.data;
  private trustedVideoUrl: SafeResourceUrl;

  private video: Object = {link: "http://youtube.com/embed/", trustedVideoUrl: <SafeResourceUrl> undefined};

  constructor(public navCtrl: NavController, public navParams: NavParams, private domSanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
    this.video["link"] = this.video["link"].concat('', (<any>this.movie.videos.results[0]).key);
    this.video["trustedVideoUrl"] = this.domSanitizer.bypassSecurityTrustResourceUrl(this.video["link"]);
  }

}
