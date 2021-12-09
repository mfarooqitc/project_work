import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Observable, of, pipe } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map,catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
    private ProcessHTTPMsgService: ProcessHTTPMsgService) { }
  

  getpromotion(): Observable <Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions')
    .pipe(catchError(this.ProcessHTTPMsgService.handleError));      
  }

  getpromotions(id:string):Observable <Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/' + id)
    .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }

  getfeaturedpromotion(): Observable <Promotion> {

    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').pipe(map(Promotion => Promotion[0]))
    .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }


}
