import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map,catchError } from 'rxjs/operators';
import { Feedback } from '../shared/feedback';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class ContactdetailsService {

  constructor(private http: HttpClient,
    private ProcessHTTPMsgService: ProcessHTTPMsgService) { }

  putfeedback(feedback:Feedback):Observable <Feedback> {
    console.log(feedback)
    const httpoptions= {
      headers: new HttpHeaders({
        'Content-type':'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL+'feedback/' , feedback,httpoptions)
    .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }
}
