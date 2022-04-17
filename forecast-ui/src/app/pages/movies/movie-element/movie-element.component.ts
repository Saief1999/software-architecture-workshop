import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Movie } from "app/dto/movies/movie";
import { genres } from "app/utilities/store";
import { TMDB_IMG_URI } from "../../../../constants";

@Component({
  selector: "app-movie-element",
  templateUrl: "./movie-element.component.html",
  styleUrls: ["./movie-element.component.css"]
})
export class MovieElementComponent {
  constructor(private router: Router) {}

  @Input() movie: Movie;

  movieImage(): string {
    if (!this.movie.poster_path) return null;
    return TMDB_IMG_URI + this.movie.poster_path;
  }

  genreName(id: number) {
    const name: String =
      genres.value.find((genre) => genre.id === id)?.name || "";
    if (name === "Science Fiction") return "Sci-Fi";
    return name;
  }
}
