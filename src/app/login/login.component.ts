import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  user = { username:'',password:'',remember:false };

  constructor(public dailogref: MatDialogRef <LoginComponent>) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.user);
    this.dailogref.close();
  }

}
