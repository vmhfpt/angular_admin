import { ProductAttributes } from './product.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from '../auth/token.service';
import {  Observable, Subject, catchError, map, throwError } from 'rxjs';
const baseUrl = 'https://nikba.co/hungvu';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
 
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

    getStatisticProductInOrder(){
      return this.request('get', `${baseUrl}/orderdetails/get-statistic-by-order-product`);
    }
    getStatisticOrderDay(){
      return this.request('get', `${baseUrl}/orders/get-satistic-by-day`);
    }
    getStatisticOrderStatus(){
      return this.request('get', `${baseUrl}/orders/get-statistic`);
    }
    getOrderSuccess(){
      return this.request('get', `${baseUrl}/orders/get-order-success`);
    }
    getRevenue(id : string){
      return this.request('get', `${baseUrl}/orderdetails/get-revenue?id=${id}`);
    }

    uploadImage(file : File){
      let formData = new FormData();
      formData.append('image', file);
      return this.request('post', `${baseUrl}/products/upload`, formData, 'multipart/form-data');
    }
    deleteImage(image : string){
      const payload = { image: image };
      return this.request('post', `${baseUrl}/products/delete-file`, payload);
    }
   
    index(){
      return this.request('get', `${baseUrl}/products`);
    }
 
    create(product : ProductAttributes) : Observable<any> {
      return this.request('post', `${baseUrl}/products`, product);
    }
    getOne(id : string) :  Observable<any>{
      return this.request('get', `${baseUrl}/products/${id}`).pipe(
        map((res: any) => {
          return res || {};
        }),
        catchError((err) => {
          return throwError(err);
        })
      );
    }
    update(id : string, product : ProductAttributes) : Observable<any>{
      return this.request('put', `${baseUrl}/products/${id}`, product)
      .pipe(catchError((err) => {
        return throwError(err);
      }));
    }

    delete(id : string): Observable<any> {
      return this.request('delete', `${baseUrl}/products/${id}`)
      .pipe(catchError((err) => {
        return throwError(err);
      }));
    }
  
}