import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 0) {
          return throwError(() => new Error(`Server ${err.url} did not reponse`));
        }
        // Handle other status codes...
        return throwError(() => err);
      })
    );
  }
  
}
