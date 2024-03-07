import { OrderAttributes } from './order.interface';
import { OrderDetailAttributes } from './order-detail.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from '../auth/token.service';
import {  Observable, Subject, catchError, map, throwError } from 'rxjs';
const baseUrl = 'https://nikba.co/hungvu';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
 
  private updateList = new Subject<void>();



    constructor(private http: HttpClient, private tokenService: TokenStorageService) {
    }


    updateListClicked() {
      this.updateList.next();
    }
  
    updateListObservable() {
      return this.updateList.asObservable();
    }




    private request(method: string, url: string, data?: any, responseType?: any) {
      const token = this.tokenService.getRefreshToken();
  
     
      return this.http.request(method, url, {
        body: data,
        responseType: responseType || 'json',
        observe: 'body',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
    }

    createOrderDetail(payload : OrderDetailAttributes){
      return this.request('post', `${baseUrl}/orderdetails`, payload);
    }
    public getOrderDetailByOrderId(id : string){
      return this.request('get', `${baseUrl}/orderdetails/${id}`);
    }
   
    index(){
      return this.request('get', `${baseUrl}/orders`);
    }
    updateState(id : string, payload : OrderAttributes){
      return this.request('put', `${baseUrl}/orders/update-state/${id}`, payload)
      .pipe(catchError((err) => {
        return throwError(err);
      }));
    }
    create(order : OrderAttributes) : Observable<any> {
      return this.request('post', `${baseUrl}/orders`, order);
    }
    getOne(id : string) :  Observable<any>{
      return this.request('get', `${baseUrl}/orders/${id}`).pipe(
        map((res: any) => {
          return res || {};
        }),
        catchError((err) => {
          return throwError(err);
        })
      );
    }
    update(id : string, order : OrderAttributes) : Observable<any>{
      return this.request('put', `${baseUrl}/orders/${id}`, order)
      .pipe(catchError((err) => {
        return throwError(err);
      }));
    }

    delete(id : string): Observable<any> {
      return this.request('delete', `${baseUrl}/orders/${id}`)
      .pipe(catchError((err) => {
        return throwError(err);
      }));
    }

    deleteOrderDetail(id : string) : Observable<any> {
      return this.request('delete', `${baseUrl}/orderdetails/${id}`)
      .pipe(catchError((err) => {
        return throwError(err);
      }));
    }
  
}