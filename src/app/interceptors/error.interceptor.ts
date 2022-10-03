import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {MessageService} from 'primeng/api';

import {TranslateService} from '@ngx-translate/core';
import {AuthenticateService} from "../services/authenticate.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private messageService: MessageService,
    private translate: TranslateService,
    private authService: AuthenticateService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        let errorMessage = '';
        this.translate.get(`error.${err.status}`).subscribe(s => { errorMessage = s; });
        this.messageService.add({
          key: 'app-toast',
          severity: 'error',
          detail: errorMessage || err.error.message
        });
        if ([401, 403].includes(err.status)) {
          // auto logout if 401 or 403 response returned from api
          this.authService.clearSession();
        }

        const error = (err && err.error && err.error.message) || err.statusText;
        return throwError(error);
      })
    );
  }
}
