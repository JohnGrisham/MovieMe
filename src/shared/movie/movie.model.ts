import { Genre } from '../genre/genre.model';
import { ShowTime } from '../showtime/showtime.model';

export class Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  longDescription: string;
  genres: Genre[] = [];
  imdb_id: string;

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

    this.id = movieResponse.id;
    this.title = movieResponse.title;
    this.poster_path = movieResponse.poster_path;
    this.overview = movieResponse.overview;
    this.release_date = movieResponse.release_date;
    this.longDescription = movieResponse.longDescription;
    this.imdb_id = movieResponse.imdb_id;
    this.videos = movieResponse.videos;
    this.credits = movieResponse.credits;
  }
}
