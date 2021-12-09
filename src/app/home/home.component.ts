import { Component, OnInit,Inject } from '@angular/core';
import { DishservicesService } from '../services/dishservices.service';
import { PromotionService } from '../services/promotion.service';
import { LeaderserviceService } from '../services/leaderservice.service';
import { Dish } from '../shared/dishes';
import { Promotion } from '../shared/promotion';
import { Leader } from '../shared/leader';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  animations: [
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish?:Dish;
  promotion?:Promotion;
  leader?:Leader;
  constructor(private dishservices: DishservicesService,
    private promoservies:PromotionService,
    private leaderservice: LeaderserviceService,
    @Inject ('BaseURL') public BaseURL) { }

  ngOnInit(): void {
    this.dishservices.getFeatureDish()
    .subscribe(dish => this.dish = dish)
    this.promoservies.getfeaturedpromotion()
    .subscribe(promotion => this.promotion = promotion)
    this.leaderservice.getfeaturedLeader()
    .subscribe(leader => this.leader = leader)
  }

}
