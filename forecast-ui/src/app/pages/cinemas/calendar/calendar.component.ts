import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CalendarOptions } from "@fullcalendar/angular";
import { MoviePlanning } from "app/dto/planning/movie-planning";
import { MoviePlanningByCinema } from "app/dto/planning/movie-planning-by-cinema";
import { MoviePlanningByMovie } from "app/dto/planning/movie-planning-by-movie";
import { PlanningsService } from "app/services/planning.service";
import { TMDB_IMG_URI } from "../../../../constants";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"]
})
export class CalendarComponent implements OnInit {
  constructor(
    private router: Router,
    private planningsService: PlanningsService
  ) {}

  @Input() byCinema: boolean = true;
  @Input() id: any = "";

  calendarOptions: CalendarOptions = {
    initialView: "timeGridWeek",
    themeSystem: "bootstrap",
    events: this.eventHandler.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventMouseEnter: this.handleEventHover.bind(this),
    eventMouseLeave: this.handleEventLeave.bind(this),
    businessHours: {
      startTime: "08:00", // a start time
      endTime: "18:00" // an end time
    }
  };

  handleEventHover(mouseEnterInfo) {
    const { el, event } = mouseEnterInfo;
    if (!el.style.backgroundSize) el.style.backgroundSize = "cover";
    if (!this.byCinema)
      el.style.backgroundImage = `url('${event.extendedProps.background}')`;
    else
      el.style.backgroundImage = `url('${TMDB_IMG_URI}/${event.extendedProps.background}')`;
  }

  handleEventLeave(mouseEnterLeave) {
    const { el } = mouseEnterLeave;
    el.style.backgroundImage = "";
  }
  handleEventClick(info) {
    const event = info.event;
    if (!event.extendedProps.byCinema) {
      // filter by movie -> go to cinema page
      this.router.navigate(["/cinemas", event.extendedProps.cinemaId]);
    } else {
      this.router.navigate(["/movies", event.extendedProps.movieId]);
    }
  }

  eventHandler(fetchInfo, successCallback, failureCallback) {
    if (!this.byCinema) {
      this.fetchPlanningsByMovie(
        fetchInfo.start,
        fetchInfo.end,
        successCallback,
        failureCallback
      );
    } else {
      this.fetchPlanningsByCinema(
        fetchInfo.start,
        fetchInfo.end,
        successCallback,
        failureCallback
      );
    }
  }

  fetchPlanningsByMovie(
    start: Date,
    end: Date,
    successCallback,
    failureCallback
  ) {
    this.planningsService
      .listPlanningsByMovie(start, end, this.id)

      .subscribe(
        (moviePlannings: MoviePlanningByMovie[]) => {
          const plannings = moviePlannings.map((moviePlanning) => {
            const { cinema, ...attrs } = moviePlanning;
            return {
              ...attrs,
              title: cinema.name,
              cinemaId: cinema._id,
              byCinema: false, // whether we're returning results by cinema or by movie
              background: cinema.imageUrl
            };
          });
          successCallback(plannings);
        },
        () => failureCallback()
      );
  }

  fetchPlanningsByCinema(
    start: Date,
    end: Date,
    successCallback,
    failureCallback
  ) {
    this.planningsService.listPlanningsByCinema(start, end, this.id).subscribe(
      (moviePlannings: MoviePlanningByCinema[]) => {
        const plannings = moviePlannings.map(
          (moviePlanning: MoviePlanningByCinema) => {
            const { movie, ...attrs } = moviePlanning;
            return {
              ...attrs,
              title: movie.title,
              movieId: movie.id,
              byCinema: true,
              background: movie.poster_path
            };
          }
        );
        successCallback(plannings);
      },
      () => failureCallback()
    );
  }

  ngOnInit(): void {}
}
