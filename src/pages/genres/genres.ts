import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { MoviedatabaseService } from '../../services/moviedatabase.service';
import { TabsPage } from '../tabs/tabs';

import { Genre } from '../../shared/genre/genre.model';
/**
 * Generated class for the GenresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-genres',
  templateUrl: 'genres.html',
})
export class GenresPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private mdata: MoviedatabaseService) {

  }

  ionViewDidLoad() {
    console.log(this.auth.genres);
  }

  genreToggle(genre: string) {
    if(this.auth.genres != undefined && this.auth.authenticated) {
      let userGenre: Genre = {name: genre, id: 0};
      let gIndex = this.findWithAttr(this.auth.genres, 'name', userGenre.name);
      console.log(gIndex);
      if(gIndex > -1) {
        this.auth.genres.splice(gIndex, 1);
      } else {
        this.auth.genres.push(userGenre);
      }
      console.log(this.auth.genres);
    }
  }

  genreActive(genre : string) {
    if(this.auth.genres != undefined && this.auth.authenticated) {
      let userGenre: Genre = {name: genre, id: 0};
      let active = false;
      this.findWithAttr(this.auth.genres, 'name', userGenre.name) > -1 ? active = !active : active;
      return active;
    }
  }

  finished() {
    this.mdata.setGenreIds(this.auth.genres)
          .then(() => this.auth.updateUser('genres', this.auth.genres));
          this.navCtrl.setRoot(TabsPage);
  }

  skip() {
    this.navCtrl.setRoot(TabsPage);
  }

  findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
  }
}
