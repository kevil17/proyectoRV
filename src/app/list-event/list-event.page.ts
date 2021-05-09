import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { DatabaseService } from '../database.service';
@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.page.html',
  styleUrls: ['./list-event.page.scss'],
})
export class ListEventPage implements OnInit {
  eventName: string = "";
  eventMessage: string = "";
  eventDate: string = "";
  eventHour: string = "";

  events: any = [];
  editMode: boolean = false;
  editId: number = 0;

  constructor(private router: Router, public database: DatabaseService,
                    private dataSrv: DataService) { 
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
    /* this.editMode = true;
    this.eventName = event.name_event;
    this.eventMessage = event.message;
    this.eventDate = event.date;
    this.eventHour = event.hour;
    this.editId = event.id; */
    this.dataSrv.data= event;
    this.router.navigate(['event']);
  }
}
