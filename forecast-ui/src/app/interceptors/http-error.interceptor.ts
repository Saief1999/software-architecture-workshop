import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1), // retry it one more time before failing
      catchError((error: HttpErrorResponse) => {
        let message = "";

        if (error.error instanceof ErrorEvent) {
          // client side error
          message = `Error: ${error.error.message}`;
        } else {
          // server side error
          message = `Error Status: ${error.status}\nMessage: ${error.error.message}`;
        }
        // here we will alert the message in a toast
        return throwError(message);
      })
    );
  }
}

export const HttpErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorInterceptor,
  multi: true
};
