import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_model/user';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  currentUser: User;
  year: any;
  month: any;
  day: any;
  hours: any;
  minutes: any;
  time: any;
  now: any;
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.year = (new Date()).getFullYear();
    this.month = (new Date()).getMonth();
    this.day = (new Date()).getDay();
    this.time = this.day + '/' + this.month + '/' + this.year;
    this.hours = (new Date()).getHours();
    this.minutes = (new Date()).getMinutes();
    this.now = this.hours + ':' + this.minutes;
  }

}
