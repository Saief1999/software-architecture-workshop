import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StoreListItem } from "app/dto/stores/store-list-item";
import { Observable } from "rxjs";
import { BACKEND_URL } from "../../constants";

@Injectable({
  providedIn: "root"
})
export class StoresService {
  private storesUri;
  constructor(private http: HttpClient) {
    this.storesUri = `${BACKEND_URL}/stores`;
  }

  listStores(): Observable<StoreListItem[]> {
    return this.http.get<StoreListItem[]>(this.storesUri);
  }
}
