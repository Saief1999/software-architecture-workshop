import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BACKEND_URL } from "../../constants";
import { Observable } from "rxjs";
import { CinemaImage } from "../dto/cinemas/cinema-image";
import { Cinema } from "../dto/cinemas/cinema";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class CinemasService {
  private cinemasUrl;
  constructor(private http: HttpClient, private router: Router) {
    this.cinemasUrl = `${BACKEND_URL}/cinemas`;
  }

  listCinemas() {
    return this.http.get(this.cinemasUrl);
  }

  uploadFile(file: File): Observable<CinemaImage> {
    const formData = new FormData();
    formData.set("image", file);
    return this.http.post<CinemaImage>(this.cinemasUrl + "/upload", formData);
  }

  createCinema(cinema: Cinema): Observable<Cinema> {
    return this.http.post<Cinema>(this.cinemasUrl, cinema);
  }

  updateCinema(cinema: Cinema): Observable<Cinema> {
    return this.http.put<Cinema>(`${this.cinemasUrl}/${cinema._id}`, cinema);
  }

  removeCinema(id: string) {
    return this.http.delete(`${this.cinemasUrl}/${id}`);
  }

  getCinema(id: string): Observable<Cinema> {
    return this.http.get<Cinema>(`${this.cinemasUrl}/${id}`);
  }
}
