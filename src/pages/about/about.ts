import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Movie } from '../../shared/movie/movie.model';
import { MoviedatabaseService } from '../../services/moviedatabase.service';

import { SearchviewPage } from '../searchview/searchview';
import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  private titleQuery: string;
  private currentQuery: string;

  popular: any = 'PopularPage';
  topRated: any = 'TopratedPage';
  upcoming: any = 'UpcomingPage';

  constructor(public navCtrl: NavController, private mdata: MoviedatabaseService) {

  }

  searchMovie($event: Event) {
    if(this.titleQuery != this.currentQuery) {
      $event.preventDefault();
      this.mdata.movies = [];
      let filterPromises = []

        this.mdata.movieSearch(this.titleQuery)
          .toPromise()
            .then(response => {
              response.json().results.forEach(
                res => filterPromises.push(filterContent(res, this.mdata)));
            });

              Promise.all(filterPromises)
              .then(() =>
                this.navCtrl.push(SearchviewPage,
                  {
                    Query: this.titleQuery,
                    Callback: this.checkCurrentQuery
                  }
                ));
          } else {
            this.navCtrl.push(SearchviewPage,
              {
                Query: this.titleQuery,
                Callback: this.checkCurrentQuery
              }
            );
          }

          function filterContent(res, mdataService) {
            mdataService.movieDetails(res.id).toPromise()
              .then((details) => {
                return new Promise((resolve, reject) => {
                  let keywords = [];

                  if(details.json()['keywords']['keywords'].length > 0)
                  { details.json()['keywords']['keywords'].forEach(item => keywords.push(item.name)); }

                  let redflaged = mdataService.screenKeyWords(keywords);
                    if(!redflaged && !(details.json()['vote_average'] == 0 && details.json()['overview'] == "" && details.json()['poster_path'] == null)) {
                      mdataService.movies.push(details.json() as Movie);
                    }
                    resolve();
              });
          });
          }
    }

    checkCurrentQuery = (current) => {
      return new Promise((resolve, reject) => {
        this.currentQuery = current; // set return value to the newName parameter
        resolve();
      });
    }
}
