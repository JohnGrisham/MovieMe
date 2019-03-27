import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Http } from '@angular/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { Movie } from '../shared/movie/movie.model';
import { Genre } from '../shared/genre/genre.model';
import { Client } from 'imdb-api';

// @ts-ignore
const Filter = require('bad-words');
const Imdb: Client = require('imdb-api');

@Injectable()
export class MoviedatabaseService {

  public nearbyShowings: Movie[] = [];
  public inTheatres: Movie[] = [];
  public genreList: Array<any> = [];
  public suggestedByGenre: Movie[] =[];
  public movies: Movie[] = [];

  private date: string;
  private oneMonthAgoToday: string;

  private screen = new Filter({});

  private promisePool: Promise<any>[] = [];

  private tmdbApi: string = '828228e4b2683577df9289c730ed85a2';
  private imdbApi: string = '5c8dafe8';

  constructor(private http: Http, private datePipe: DatePipe, private auth: AuthService) {
    this.date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    this.oneMonthAgoToday = this.datePipe.transform(Date.now() - 2.628e+9, 'yyyy-MM-dd');
   }

   //#region TBDB calls
   movieSearch(titleQuery) : Observable<any> {
     return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.tmdbApi}&include_adult=false&include_video=false&query=${titleQuery}`);
   }

   movieDetails(movie_id) : Observable<any> {
     return this.http.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${this.tmdbApi}&include_adult=false&include_video=false&append_to_response=videos,credits,release_dates,keywords`);
   }

   discover(sorting: string, page: number = 1) : Observable<any> {
     return this.http.get(`https://api.themoviedb.org/3/discover/movie?api_key=${this.tmdbApi}&include_adult=false&include_video=false&language=en-US&region=US&${sorting}&page=${page}`);
   }

   topRated(page: number = 1) : Observable<any> {
     return this.http.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${this.tmdbApi}&include_adult=false&include_video=false&language=en-US&region=US&page=${page}`);
   }

   nowPlaying() : Observable<any> {
     return this.http.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.tmdbApi}&include_adult=false&include_video=false&language=en-US&region=US`);
   }

   genreSuggestions(genre : Genre) : Observable<any> {
     if(this.auth.genres) {
       return this.http.get(`https://api.themoviedb.org/3/discover/movie?api_key=${this.tmdbApi}&sort_by=vote_count.desc&include_adult=false&include_video=false&with_genres=${genre.id}&page=1&primary_release_date.lte=${this.date}&primary_release_date.gte=${this.oneMonthAgoToday}&language=en-US&region=US`);
     }
   }

   getGenreIds() : Observable<any> {
     return this.http.get(`https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=${this.tmdbApi}`);
   }
   //#endregion

   lookUpnearbyShows(zip) : Observable<any> {
     return this.http.get(`http://data.tmsapi.com/v1.1/movies/showings?startDate=${this.date}&zip=${zip}&radius=10&units=mi&api_key=mx9fj3vj38n4w7ufzgvr5m3j`);
   }

   getOMDB(id: string) {
     return Imdb.get({id: id}, {apiKey: this.imdbApi});
   }

   screenKeyWords(text) {
     if(text) {
       return this.screen.isProfane(text);
     }
   }

   async setGenreIds(array: Genre[]) {
       let promise = new Promise((resolve, reject) => {
       for(var x = 0; x < this.genreList.length; x++) {
         for(var y = 0; y < array.length; y++) {
           if(this.genreList[x]['name'] == array[y]['name']) {
             array[y]['id'] = this.genreList[x]['id'];
           }
         }
       }
       resolve(true);
     });
     let result = await promise;
     return result;
   }
}
