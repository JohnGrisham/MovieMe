import { Genre } from '../genre/genre.model';
import { ShowTime } from '../showtime/showtime.model';

export class Movie {
  id: number;
  title: string;
  Name: string;
  poster_path: string;
  overview: string;
  release_date: string;
  Rated: string;
  vote_average: number;
  Rating: string;
  Metascore: string;
  runtime: string;
  longDescription: string;
  genres: Genre[] = [];
  imdb_id: string;
  imdburl: string;
  year: string;

  Ratings: Object[];

  showtimes: ShowTime[] = [];

  videos: {
    results: Object[];
  }

  credits: {
    cast: Object[];
    crew: Object[];
  }

  constructor(movieResponse: any) {
    if(movieResponse.genre_ids) {
      for(var x = 0; x < movieResponse.genre_ids.length; x++) {
        this.genres.push(new Genre(movieResponse.genre_ids[x]));
      }
    }

    if(movieResponse.showtimes) {
      for(let showtime in movieResponse.showtimes) {
        this.showtimes.push(new ShowTime(showtime));
      }
    }


    // Refactor - Make loop
    this.id = movieResponse.id;
    this.title = movieResponse.title;
    this.Name = movieResponse.Name;
    this.poster_path = movieResponse.poster_path;
    this.overview = movieResponse.overview;
    this.release_date = movieResponse.release_date;
    this.Rated = movieResponse.Rated;
    this.vote_average = movieResponse.vote_average;
    this.Rating = movieResponse.Rating;
    this.Ratings = movieResponse.ratings;
    this.Metascore = movieResponse.Metascore;
    this.runtime = movieResponse.runtime;
    this.longDescription = movieResponse.longDescription;
    this.imdb_id = movieResponse.imdb_id;
    this.imdburl = movieResponse.imdburl;
    this.videos = movieResponse.videos;
    this.credits = movieResponse.credits;
    this.year = movieResponse.year;
  }
}
