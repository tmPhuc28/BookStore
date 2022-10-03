import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnAuthenticatedModule } from './un-authenticated/un-authenticated.module';
import { AuthenticatedModule } from './authenticated/authenticated.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  HTTP_INTERCEPTORS,
  HttpBackend,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { ConfirmationService, MessageService } from 'primeng/api';
import { appInitializer } from './interceptors/app.initializer';
import { HashLocationStrategy } from '@angular/common';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
export function createTranslateLoader(http: HttpBackend) {
  return new TranslateHttpLoader(new HttpClient(http), 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    UnAuthenticatedModule,
    AuthenticatedModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpBackend],
      },
    }),
    PrimeNgModule,
    OverlayModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      // deps: [AuthenticateService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HashLocationStrategy, useClass: HashLocationStrategy },
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
