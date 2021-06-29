import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { AlarmService } from '../alarm.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.page.html',
  styleUrls: ['./new-event.page.scss'],
})
export class NewEventPage implements OnInit {
  eventName: string = "";
  eventMessage: string = "";
  eventDate: string = "";
  eventHour: string = "";
  datom: any = "";
  events: any = [];
  editMode: boolean = false;
  editId: number = 0;
  idAlert: number = 0;

  constructor(private router: Router, public database: DatabaseService,
        public alarm:AlarmService) { 
    this.database.createDatabase().then(() => {
      // will call get categories
      this.getEvents();
    });

  }

  ngOnInit() {
  }
  back(){
    this.router.navigate(['reminders']);
  }
  
  addEvent() {
    if (!this.eventName.length) {
      alert("Enter events name");
      return;
    }

    if (this.editMode) {
      // edit category
      this.database
        .editEvent(this.eventName,this.eventMessage, this.eventDate, this.eventHour, this.editId)
        .then((data) => {
          this.eventName = "";
          this.eventMessage = "";
          this.eventDate = "";
          this.eventHour = "";
          (this.editMode = false), (this.editId = 0);
          alert(data);
          this.alarm.createNotifications();
          this.getEvents();
        });
    } else {
      // add category
      this.database.addEvent(this.eventName, this.eventMessage, this.eventDate, this.eventHour).then((data) => {
        this.eventName = "";
        this.eventMessage = "";
        this.eventDate = "";
        this.eventHour = "";
        this.idAlert = this.idAlert + 1;
        alert(data);
        this.alarm.createNotifications();
        this.getEvents();
      });
    }
    
  }
  
  getEvents() {
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
      this.alarm.createNotifications();
      this.getEvents();
    });
  }

  editEvent(event: any) {
    this.editMode = true;
    this.eventName = event.name_event;
    this.eventMessage = event.message;
    this.eventDate = event.date;
    this.eventHour = event.hour;
    this.editId = event.id;
    this.alarm.createNotifications();
  }

}
