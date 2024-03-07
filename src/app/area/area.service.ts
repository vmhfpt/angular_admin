import { AreaAttributes } from './area.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from '../auth/token.service';
import {  Observable, Subject, catchError, map, throwError } from 'rxjs';
const baseUrl = 'https://nikba.co/hungvu';

@Injectable({
  providedIn: 'root'
})

export class AreaService {
 
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
      return this.request('get', `${baseUrl}/admin/areas`);
    }
 
    create(area : AreaAttributes) : Observable<any> {
      return this.request('post', `${baseUrl}/admin/areas/add`, area);
    }
    getOne(id : number) :  Observable<any>{
      return this.request('get', `${baseUrl}/admin/areas/${id}`).pipe(
        map((res: any) => {
          return res || {};
        }),
        catchError((err) => {
          return throwError(err);
        })
      );
    }
    update(id : number, area : AreaAttributes) : Observable<any>{
      return this.request('put', `${baseUrl}/admin/areas/update/${id}`, area)
      .pipe(catchError((err) => {
        return throwError(err);
      }));
    }

    delete(id : number): Observable<any> {
      return this.request('delete', `${baseUrl}/admin/areas/delete/${id}`)
      .pipe(catchError((err) => {
        return throwError(err);
      }));
    }
  
  }