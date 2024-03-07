import { UserAttributes } from './user.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from '../auth/token.service';
import {  Observable, Subject, catchError, map, throwError } from 'rxjs';
const baseUrl = 'https://nikba.co/hungvu';

@Injectable({
  providedIn: 'root'
})

export class UserService {
 
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
   
    index(){
      return this.request('get', `${baseUrl}/users`);
    }
 
    create(user : UserAttributes) : Observable<any> {
      return this.request('post', `${baseUrl}/users`, user);
    }
    getOne(id : string) :  Observable<any>{
      return this.request('get', `${baseUrl}/users/${id}`).pipe(
        map((res: any) => {
          return res || {};
        }),
        catchError((err) => {
          return throwError(err);
        })
      );
    }
    update(id : string, user : UserAttributes) : Observable<any>{
      return this.request('put', `${baseUrl}/users/${id}`, user)
      .pipe(catchError((err) => {
        return throwError(err);
      }));
    }

    delete(id : string): Observable<any> {
      return this.request('delete', `${baseUrl}/users/${id}`)
      .pipe(catchError((err) => {
        return throwError(err);
      }));
    }
  
}