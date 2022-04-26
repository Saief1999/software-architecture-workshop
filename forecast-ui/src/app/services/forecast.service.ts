import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BACKEND_URL } from "../../constants";

@Injectable({
  providedIn: "root"
})
export class ForecastService {
  private forecastUri;
  constructor(private http: HttpClient) {
    this.forecastUri = `${BACKEND_URL}/forecast`;
  }

  getForecast(productId: string, storeId: string, date: string): Observable<any> {
    return this.http.get(`${this.forecastUri}/predict`, {
      params: {
        productId: productId,
        storeId: storeId,
        date: date
      }
    })
  }
}
