export class MoviePlanningByCinema {
  _id: string;
  start: Date;
  end: Date;
  movie: Movie;
  cinema: string;
}

type Movie = {
  id: string;
  title: string;
  poster_path: string;
};
