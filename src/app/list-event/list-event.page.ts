import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { DatabaseService } from '../database.service';
import { AlarmService } from '../alarm.service';
@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.page.html',
  styleUrls: ['./list-event.page.scss'],
})
export class ListEventPage implements OnInit {
  events: any = [];
  constructor(private router: Router, public database: DatabaseService,
                    private dataSrv: DataService, private alarm: AlarmService) { 
    this.database.createDatabase().then(() => {
      // will call get categories
      this.getEvents();
    });
  }

  ngOnInit() {
  }
  back(){
    this.router.navigate(['home']);
  }
  eventPage(event){
    this.dataSrv.data= event;
    this.router.navigate(['event']);
  }
  getEvents() {
    this.alarm.createNotifications();
    this.database.getEvent().then((data) => {
      this.events = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {         
            this.events.push(data.rows.item(i));
        }
      }
    });
  }
  deleteEvent(id: number) {
    this.database.deleteEvent(id).then((data) => {
      alert(data);
      this.getEvents();
    });
  }

  editEvent(event: any) {
    this.dataSrv.data = event;
    this.router.navigate(['event']);
  } 
}
