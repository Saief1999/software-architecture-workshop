export class ListResult<T> {
  page: number = 1; // current page number

  results: T[] = []; // the results

  total_pages: number = 1; // total number of pages
}
