import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "app/models/user.model";
import { LISTCONTACTSLINK, SENDEMAILTOCONTACTSLINK } from "../../constants";
import { Observable } from "rxjs";
import { SendEmailAdminResuestDto } from "app/dto/landing/send-email-admin.request.dto";

@Injectable({
  providedIn: "root"
})
export class LandingPageService {
  constructor(private http: HttpClient) {}

  getListAdmins(): Observable<User[]> {
    return this.http.get<User[]>(LISTCONTACTSLINK);
  }

  sendEmailToContacts(payload: SendEmailAdminResuestDto): Observable<any> {
    return this.http.post<any>(SENDEMAILTOCONTACTSLINK, payload);
  }
}
