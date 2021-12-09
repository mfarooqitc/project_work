import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map,catchError } from 'rxjs/operators';
import { Dish } from '../shared/dishes';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishservicesService {

  constructor(private http: HttpClient,
    private ProcessHTTPMsgService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes')
    .pipe(catchError(this.ProcessHTTPMsgService.handleError));
    
  }

  getDish(id: string): Observable <Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
    .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }

  getFeatureDish(): Observable <Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(Dish => Dish[0]))
    .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(map(Dish => Dish.map(Dish=>Dish.id)))
    .pipe(catchError(error=>error));
  }

  putDish(dish:Dish):Observable <Dish> {
    console.log(dish);
    const httpoptions= {
      headers: new HttpHeaders({
        'Content-type':'application/json'
      })
    };
    return this.http.put<Dish>(baseURL+'dishes/' + dish.id,dish,httpoptions)
    .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }
}
