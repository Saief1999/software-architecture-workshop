import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "app/dto/products/product";
import { Observable } from "rxjs";
import { BACKEND_URL } from "../../constants";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  private productsUri;
  constructor(private http: HttpClient) {
    this.productsUri = `${BACKEND_URL}/products`;
  }

  listProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUri);
  }
}
