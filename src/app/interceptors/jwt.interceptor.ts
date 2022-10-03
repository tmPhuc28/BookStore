import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {MessageService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";

import AppUtil from '../utilities/app-util';
import {Router} from '@angular/router';
import {AuthenticateService} from "../services/authenticate.service";
import AppConstant from "../utilities/app-constant";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  appUtil = AppUtil;
  constructor(private authenticateService: AuthenticateService, private messageService: MessageService, private translate: TranslateService,
              private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      url: `${AppConstant.DEFAULT_URLS.API}${request.url}`,
      setHeaders: {
        'Auth-Token': `${this.authenticateService.token}`,
      }
    });
    return next.handle(request).pipe(map(event =>  {
      // @ts-ignore
      if (event && event.body) {
        // @ts-ignore
        event.body = AppUtil.toCamelCaseKey({obj: event.body});
        // @ts-ignore
        if (event.body?.status && event.body.status !== 200 && event.body.status !== 403) {
         // @ts-ignore
          if(event.body.status === 401){
            // Token had been expired
            this.authenticateService.clearSession()
            this.router.navigate(['/sign-in']).then(res => {});
          }
          else {
            // check and set not allow to show toast in login page
            if(request.url.includes('/api/auth') || request.url.includes('/sign-up')) {
              this.appUtil.toast(null, null, false);
            }
            else {
              // @ts-ignore
              let key = event.body.data || `error.${event.body.status}`;
              this.translate.get(key).subscribe(errorMessage => {
                this.appUtil.toast(errorMessage, event, true, this.messageService);
              });
            }
          }
        }
      }
      return event;
    }));
  }
}
