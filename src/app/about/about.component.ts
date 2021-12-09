import { Component, Inject, OnInit } from '@angular/core';
import { LeaderserviceService } from '../services/leaderservice.service';
import { Leader } from '../shared/leader';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less'],
  animations: [
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leader?:Leader[];
  constructor(private leaderservices: LeaderserviceService,
    @Inject ('BaseURL') public BaseURL) { }

  ngOnInit(): void {
    this.leaderservices.getLeader()
    .subscribe(leader => this.leader = leader);    
  }

}
