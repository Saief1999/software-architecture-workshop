import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BACKEND_URL } from "../../constants";

@Injectable({
  providedIn: "root"
})
export class MoviesService {
  private moviesUri;
  constructor(private http: HttpClient) {
    this.moviesUri = `${BACKEND_URL}/movies`;
  }

  listMovies() {
    return this.http.get(this.moviesUri);
  }

  searchMovies(query: string, page: number = 1) {
    return this.http.get(`${this.moviesUri}/search`, {
      params: { query, page: page + "" }
    });
  }

  listPopularMovies(page: number = 1) {
    return this.http.get(`${this.moviesUri}/popular`, {
      params: { page: page + "" }
    });
  }

  listTopRatedMovies(page: number = 1) {
    return this.http.get(`${this.moviesUri}/top_rated`, {
      params: { page: page + "" }
    });
  }

  getMovie(id: number) {
    return this.http.get(`${this.moviesUri}/${id}`);
  }
}
