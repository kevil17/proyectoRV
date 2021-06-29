import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.page.html',
  styleUrls: ['./reminders.page.scss'],
})
export class RemindersPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  newEvent(){
    this.router.navigate(['new-event']);
  }
  betwenWeek(){
    this.router.navigate(['betwen-week']);
  }
  forToday(){
    this.router.navigate(['for-today']);
  }
}
