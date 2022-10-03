import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import HttpResponse from "../model/http.response.model";
import {map} from "rxjs/operators";

let _prefix = "/user";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // New user or using sign up page
  createUser(params: Object): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(`${_prefix}`, params).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  getUser(id: any): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}/${id}`).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  getUsers(params: Object): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}`, params).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  updateUser(id: any, params: Object): Observable<HttpResponse> {
    return this.http.put<HttpResponse>(`${_prefix}/${id}`, params).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  deleteUser(id: any): Observable<HttpResponse> {
    return this.http.delete<HttpResponse>(`${_prefix}/${id}`).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  verifyUser(userName: string): Observable<HttpResponse> {
    return this.http.put<HttpResponse>(`${_prefix}/verify-account/${userName}`, {}).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }
}
