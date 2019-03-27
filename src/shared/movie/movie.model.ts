import { Genre } from '../genre/genre.model';
import { ShowTime } from '../showtime/showtime.model';

export class Movie {
  id: number;
  title: string;
  name: string;
  poster_path: string;
  overview: string;
  release_date: string;
  rated: string;
  vote_average: number;
  rating: string;
  metascore: string;
  runtime: string;
  longDescription: string;
  genres: Genre[] = [];
  imdb_id: string;

  ratings: Object[];

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
    this.name = movieResponse.name;
    this.poster_path = movieResponse.poster_path;
    this.overview = movieResponse.overview;
    this.release_date = movieResponse.release_date;
    this.rated = movieResponse.rated;
    this.vote_average = movieResponse.vote_average;
    this.rating = movieResponse.rating;
    this.ratings = movieResponse.ratings;
    this.metascore = movieResponse.metascore;
    this.runtime = movieResponse.runtime;
    this.longDescription = movieResponse.longDescription;
    this.imdb_id = movieResponse.imdb_id;
    this.videos = movieResponse.videos;
    this.credits = movieResponse.credits;
  }
}
