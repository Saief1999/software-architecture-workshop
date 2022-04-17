import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MoviePlanning } from "app/dto/planning/movie-planning";
import { MoviePlanningByCinema } from "app/dto/planning/movie-planning-by-cinema";
import { MoviePlanningByMovie } from "app/dto/planning/movie-planning-by-movie";
import { Observable } from "rxjs";
import { BACKEND_URL } from "../../constants";

@Injectable({
  providedIn: "root"
})
export class PlanningsService {
  private planningsUri;
  constructor(private http: HttpClient) {
    this.planningsUri = `${BACKEND_URL}/plannings`;
  }
  listPlanningsByMovie(
    start: Date,
    end: Date,
    id: number
  ): Observable<MoviePlanningByMovie[]> {
    return this.http.get<MoviePlanningByMovie[]>(
      `${this.planningsUri}/bymovie`,
      {
        params: {
          start: start.toISOString(),
          end: end.toISOString(),
          id: id + ""
        }
      }
    );
  }

  listPlanningsByCinema(
    start: Date,
    end: Date,
    id: string
  ): Observable<MoviePlanningByCinema[]> {
    return this.http.get<MoviePlanningByCinema[]>(
      `${this.planningsUri}/bycinema`,
      {
        params: {
          start: start.toISOString(),
          end: end.toISOString(),
          id: id + ""
        }
      }
    );
  }
}
