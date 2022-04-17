import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BACKEND_URL } from "../../constants";

@Injectable({ providedIn: "root" })
export class AboutUsService {
  private mailUri;

  constructor(private http: HttpClient, private router: Router) {
    this.mailUri = `${BACKEND_URL}/aboutus`;
  }

  sendMail(email: string, name: string, message: string) {
    this.http
      .post(
        `${this.mailUri}/search`,
        { email: email, name: name, message: message },
        {
          headers: new HttpHeaders().append("Content-Type", "application/json")
        }
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
}
