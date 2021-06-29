import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { AlarmService } from '../alarm.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-betwen-week',
  templateUrl: './betwen-week.page.html',
  styleUrls: ['./betwen-week.page.scss'],
})
export class BetwenWeekPage implements OnInit {
  eventDay: any =0 ;
  test: any;
  year: any;
  month: any;
  day: any; 
  dayNum: any;
  eventName: string = "";
  eventMessage: string = "";
  eventHour: string = "";
  eventDate: any= "";
  constructor(private router: Router,public database: DatabaseService,
    public alarm:AlarmService) {
      this.database.createDatabase().then(() => {
      });

      this.test = new Date().toISOString().split("T");
      this.year = parseInt(this.test[0].split("-")[0]);
      this.month = parseInt(this.test[0].split("-")[1])-1;
      this.day = parseInt(this.test[0].split("-")[2]);
      this.dayNum = new Date().getDay();
     }

  ngOnInit() {
  }
  alerta(){
    /* this.eventDay=new Date(this.year,this.month,this.day+parseInt(this.eventDay)); */
    alert(this.getValueDay());
  }
  addEvent() {
    if (!this.eventName.length) {
      alert("Enter events name");
      return;
    }else{
      this.eventDate=new Date(this.year,this.month,this.day+(this.getValueDay())); // aqui habia un -1 en this.day pruebas
      // add reminder obtener el dia actual, convertirlo en numero ejemplo jueves 4 + 0(lunes)
      this.database.addEvent(this.eventName, this.eventMessage, this.eventDate.toISOString(), this.eventHour).then((data) => {
        this.eventName = "";
        this.eventMessage = "";
        this.eventDate = "";
        this.eventHour = "";
        this.alarm.createNotifications();
        alert(data);    
      });
    }
  }
  getValueDay(){
    if(this.dayNum > parseInt(this.eventDay)){
      return this.dayNum + parseInt(this.eventDay)-1;
    }
    else{ return parseInt(this.eventDay) - this.dayNum }
  }
  back(){
    this.router.navigate(['reminders']);
  }
}
