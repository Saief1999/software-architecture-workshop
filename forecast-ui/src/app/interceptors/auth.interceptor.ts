import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpHeaders,
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authenticationService.isAuthenticated()) {
      const headers = new HttpHeaders().set(
        "Authorization",
        `bearer ${localStorage.getItem("token")}`
      );
      const newRequest = request.clone({ headers });
      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}

export const AuthentificationInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};
