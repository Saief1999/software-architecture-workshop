export class BasicMovie {
  poster_path: string | null;
  overview: string;
  release_date: string;
  id: number;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_average: number;
}

export class Movie extends BasicMovie {
  genre_ids: number[];
}
