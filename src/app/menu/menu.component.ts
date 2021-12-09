import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dishes';
import { DishservicesService } from '../services/dishservices.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})

export class MenuComponent implements OnInit {
   
  dishes?:Dish[];
  errMess?:string;

  constructor(private dishservices: DishservicesService,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {
    this.dishservices.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      errMsg=> this.errMess = <any>errMsg);
  }

}
