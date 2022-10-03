import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import HttpResponse from "../model/http.response.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

let _prefix = "/cart";
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  // get list id, userId, productId, quantity
  getAllItems(id: any): Observable<HttpResponse>{
    return this.http.get<HttpResponse>(`${_prefix}/user/${id}`).pipe(
      map(
      result => {
        return result;
      })
    )
  }

  getCartItem(id: any): Observable<HttpResponse>{
    return this.http.get<HttpResponse>(`${_prefix}/${id}`).pipe(
      map(
      result => {
        return result;
      })
    )
  }

  getAllCartItems(params: Object): Observable<HttpResponse>{
    return this.http.get<HttpResponse>(`${_prefix}`, params).pipe(
      map(
      result => {
        return result;
      })
    )
  }

  addToCart(params: Object): Observable<HttpResponse>{
    return this.http.post<HttpResponse>(`${_prefix}`, params).pipe(
      map(
      result => {
        return result;
      })
    )
  }

  updateCartItem(id: any, params: Object): Observable<HttpResponse>{
    return this.http.put<HttpResponse>(`${_prefix}/${id}`, params).pipe(
      map(
      result => {
        return result;
      })
    )
  }

  removeCartItem(id: any): Observable<HttpResponse>{
    return this.http.delete<HttpResponse>(`${_prefix}/${id}`).pipe(
      map(
      result => {
        return result;
      })
    )
  }

  removeAllCartItems(): Observable<HttpResponse>{
    return this.http.delete<HttpResponse>(`${_prefix}`).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }
}
