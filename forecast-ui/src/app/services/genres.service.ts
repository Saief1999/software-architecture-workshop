import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Genre } from "app/dto/genres/genre";
import { Observable } from "rxjs";
import { BACKEND_URL } from "../../constants";

@Injectable({
  providedIn: "root"
})
export class GenresService {
  private genresUri;
  constructor(private http: HttpClient) {
    this.genresUri = `${BACKEND_URL}/genres`;
  }

  listGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.genresUri}/movies`);
  }
}
