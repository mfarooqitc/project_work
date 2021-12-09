import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { Observable, of } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map,catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class LeaderserviceService {

  constructor(private http:HttpClient,
    private ProcessHTTPMsgService: ProcessHTTPMsgService) { }

  getLeader():Observable <Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership')
    .pipe(catchError(this.ProcessHTTPMsgService.handleError));    
  }

  getLeaders(id:string): Observable <Leader> {
    
    return this.http.get<Leader> (baseURL + 'leadership' + id)
    .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }

  getfeaturedLeader(): Observable <Leader> {
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map(Promotion => Promotion[0]))
    .pipe(catchError(this.ProcessHTTPMsgService.handleError));
    }
}
