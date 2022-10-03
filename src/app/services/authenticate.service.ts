import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthUser} from "../model/AuthUser.model";
import {BehaviorSubject, Observable} from "rxjs";
import AppConstant from "../utilities/app-constant";
import HttpResponse from "../model/http.response.model";
import {map} from "rxjs/operators";

let _prefix = "/auth";
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  authUserOj: AuthUser | undefined;

  resetAuthUser = new BehaviorSubject('Reset Auth User');

  constructor(private http: HttpClient) {}

  public doResetAuthUser(): void {
    this.resetAuthUser.next('');
  }

  public setToken(token: string): void {
    localStorage.setItem(AppConstant.STORAGE_KEYS.SESSION, token);
  }

  public get token(): string | null {
    return localStorage.getItem(AppConstant.STORAGE_KEYS.SESSION);
  }

  public deleteToken(): void {
    localStorage.removeItem(AppConstant.STORAGE_KEYS.SESSION);
  }

  public clearSession(): void {
    this.setAuthUser(undefined);
    this.deleteToken();
    localStorage.clear();
  }

  public get authUser(): AuthUser | undefined {
    return this.authUserOj;
  }

  public setAuthUser(authUserOj: AuthUser | undefined): void {
    this.authUserOj = authUserOj;
  }

  login(params: any): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(`${_prefix}`, params).pipe(
      map((result) => {
        return result;
      })
    );
  }

  getAuthInfo(): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}/info`, {}).pipe(
      map((result) => {
        return result;
      })
    );
  }

  logout(id : any): Observable<HttpResponse> {
    return this.http.delete<HttpResponse>(`${_prefix}/${id}`, {}).pipe(
      map((result) => {
        return result;
      })
    );
  }

  getAuth(id : any): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}/${id}`).pipe(
      map((result) => {
        return result;
      })
    );
  }
  // requestForgotPassword(params: any): Observable<HttpResponse> {
  //   return this.http
  //     .post<HttpResponse>(`${_prefix}/reset-password`, params)
  //     .pipe(
  //       map((result) => {
  //         return result;
  //       })
  //     );
  // }
  //
  // resetPassword(resetCodeId: string, params: any): Observable<HttpResponse> {
  //   return this.http
  //     .put<HttpResponse>(`${_prefix}/reset-password/${resetCodeId}`, params)
  //     .pipe(
  //       map((result) => {
  //         return result;
  //       })
  //     );
  // }
}
