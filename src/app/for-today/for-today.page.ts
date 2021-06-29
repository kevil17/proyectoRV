import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { AlarmService } from '../alarm.service';
import { IonCheckbox } from '@ionic/angular';

@Component({
  selector: 'app-for-today',
  templateUrl: './for-today.page.html',
  styleUrls: ['./for-today.page.scss'],
})

export class ForTodayPage implements OnInit {
  eventName: string = "";
  eventMessage: string = "";
  eventHour: string = "";
  eventDate: any= "";

  hourMinutes: any;
  eventTime: any;
  eventTime2: any;

  checkHour: boolean;
  checkTime: boolean;
  constructor(private router: Router,public database: DatabaseService,
    public alarm:AlarmService) {
    this.eventDate = new Date().toISOString();
   }

  ngOnInit() {
  }

  addEvent() {
    
    if(this.checkHour){
      if (!this.eventName.length) {
        alert("Enter events name");
        return;
      }else{
        this.database.addEvent(this.eventName, this.eventMessage, new Date().toISOString(), this.eventHour).then((data) => {
          this.eventName = "";
          this.eventMessage = "";
          this.eventDate = "";
          this.eventHour = "";
          this.alarm.createNotifications();
          alert(data);    
        });
      }
    }else{
      if(this.checkTime){
        if (!this.eventName.length) {
          alert("Enter events name");
          return;
        }else{
          
          //funcion para obtener la hora y minuto del datatime, luego sacar los numeros de las horas y minutos
          // ara luego sumar luego hacer un toString
          this.database.addEvent(this.eventName, this.eventMessage, new Date().toISOString(), this.timeReturn()).then((data) => {
            this.eventName = "";
            this.eventMessage = "";
            this.eventDate = "";
            this.eventHour = "";
            this.alarm.createNotifications();
            alert(data);    
          });
        }
      }
    }
    
  }
  timeReturn(){
    this.eventTime= new Date().getHours();
    this.eventTime2 = new Date().getMinutes();

    var hour=new Date(this.hourMinutes).getHours();
    var minutes=new Date(this.hourMinutes).getMinutes();

    var resultHour= (this.eventTime + hour)-4;
    var resultMinutes= this.eventTime2 + minutes;

    return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(),resultHour,resultMinutes).toISOString();
  }

  checketHour(){
    this.checkHour=true;
    this.checkTime=false;
    this.check();
  }
  checketTime(){
    this.checkTime=true;
    this.checkHour=false;
    this.check();
  }
  check(){
    var checkBox = document.getElementsByTagName('ion-checkbox')[0];
    var checkBox2 = document.getElementsByTagName('ion-checkbox')[1];
    
    var itemBox = document.getElementsByTagName('ion-item')[2];
    var itemBox2 = document.getElementsByTagName('ion-item')[4];
    if(this.checkHour==true && this.checkTime==false){
      checkBox2.checked=false; 
      itemBox2.disabled=true;
      itemBox.disabled=false;
      
    }
    if(this.checkTime==true && this.checkHour==false){
     checkBox.checked=false;
      itemBox2.disabled=false;
      itemBox.disabled=true;
    }
  }
  testEvent(){
    //alert(this.eventTime+ ":" + this.eventTime2);
    //alert(this.hourMinutes);
    //var hour=new Date(this.hourMinutes);
    //var minutes=this.hourMinutes.getMinutes();
    //alert(hour.getHours()+3);

    //alert(new Date().getFullYear());

    this.eventTime= new Date().getHours();
    this.eventTime2 = new Date().getMinutes();

    var hour=new Date(this.hourMinutes).getHours();
    var minutes=new Date(this.hourMinutes).getMinutes();

    var resultHour= (this.eventTime + hour)-4;
    var resultMinutes= this.eventTime2 + minutes;
    //var day=new Date().getDate();
    alert(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(),resultHour,resultMinutes).toISOString()); 
    //alert(new Date(2021,5,day));
  }
  back(){
    this.router.navigate(['reminders']);
  }
}
