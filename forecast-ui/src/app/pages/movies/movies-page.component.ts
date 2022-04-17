import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Genre } from "app/dto/genres/genre";
import { ListResult } from "app/dto/movies/list-result";
import { Movie } from "app/dto/movies/movie";
import { MoviesService } from "app/services/movies.service";
import { genres } from "app/utilities/store";
import { fromEvent, Subject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  tap
} from "rxjs/operators";

@Component({
  selector: "app-movies",
  templateUrl: "./movies-page.component.html",
  styleUrls: [
    "./movies-page.component.css",
    "../../../../node_modules/angular2-multiselect-dropdown/themes/default.theme.css"
  ]
})
export class MoviesPageComponent implements OnInit {
  constructor(private router: Router, private moviesService: MoviesService) {}

  // @ViewChild('search') searchInput: ElementRef;

  searchSubject: Subject<string> = new Subject(); // used to push new search Texts and debounce getting the result
  page: number = 1;
  movies: Movie[] = [];
  total_pages: number = 1;
  orderOptions = [];
  order = null;
  orderSettings = {};
  selector = "order";
  searchedText = "";
  flag = false;

  ngOnInit(): void {
    this.orderOptions = [
      { id: "popular", itemName: "Popular" },
      { id: "top_rated", itemName: "Top Rated" }
    ];
    (this.order = [{ id: "popular", itemName: "Popular" }]),
      (this.orderSettings = {
        // enableSearchFilter: false,
        // addNewItemOnFilter: true,
        singleSelection: true,
        text: "Select Order"
      });

    this.listPopular();
    this.searchSubject
      .pipe(
        filter(Boolean), // filter out "undefined"
        debounceTime(600), // debounce for 600ms
        distinctUntilChanged() // if same value ignore it
      )
      .subscribe((value: string) => {
        this.selector = "search";
        this.page = 1;
        this.search(value, 1);
      });
  }

  atSearch(event) {
    this.searchedText = event.target.value;
    this.searchSubject.next(event.target.value); // forward the input to the subject to debounce it
  }

  changeOrder(order) {
    this.selector = order;
    this.page = 1;
    this.listByOrder(order);
  }

  listByOrder(order, page = 1) {
    if (order.id === "top_rated") {
      this.listTopRated(page);
    } else {
      this.listPopular(page);
    }
  }

  listPopular(page = 1) {
    this.moviesService
      .listPopularMovies(page)
      .subscribe((movieList: ListResult<Movie>) => {
        this.saveMoviesResult(movieList, page);
      });
  }

  listTopRated(page = 1) {
    this.moviesService
      .listTopRatedMovies(page)
      .subscribe((movieList: ListResult<Movie>) => {
        this.saveMoviesResult(movieList, page);
      });
  }

  search(query: string, page = 1) {
    this.moviesService
      .searchMovies(query)
      .subscribe((movieList: ListResult<Movie>) => {
        this.saveMoviesResult(movieList, page);
      });
  }

  saveMoviesResult(movieList: ListResult<Movie>, page: number) {
    if (page === 1) {
      this.movies = movieList.results;
      this.page = movieList.page;
      this.total_pages = movieList.total_pages;
    } else {
      this.movies.push(...movieList.results);
    }
    this.flag = false; // enable infinite scroll again
  }

  onScroll() {
    this.page += 1;
    this.flag = true; // disable infinite scroll, so we don't get duplicate events
    if (this.selector === "order") {
      this.listByOrder(this.order, this.page);
    } else {
      this.search(this.searchedText, this.page);
    }
  }

  infiniteScrollDisabled() {
    return this.page === this.total_pages || this.flag === true;
  }
}
