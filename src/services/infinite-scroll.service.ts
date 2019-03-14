import { Injectable } from '@angular/core';
import { MoviedatabaseService } from './moviedatabase.service';

import { Movie } from '../shared/movie/movie.model';

@Injectable()
export class InfiniteScrollService {

  constructor(private mdata: MoviedatabaseService) {
  }


  getPageNumber(request, infiniteScroll, movies: Array<Movie>, page: number, pages: number) : Promise<Movie[]> {
    return request
    .toPromise()
     .then(res => {
      movies = movies.concat(res.json().results as Movie[]);
      if (page === pages) {
          infiniteScroll.enable(false);
        }
      return movies;
    });
  }
}
