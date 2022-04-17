export class MoviePlanningByMovie {
  _id: string;
  start: Date;
  end: Date;
  movieId: number;
  cinema: Cinema;
}

type Cinema = {
  _id: string;
  name: string;
  imageUrl: string;
};
