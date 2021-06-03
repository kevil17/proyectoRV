import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
// notificaciones locales y alert
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AlertController, Platform } from '@ionic/angular';
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
    private localNotifications: LocalNotifications,
    private alertCtrl: AlertController, private plt: Platform, public alarm:AlarmService) { 
    this.database.createDatabase().then(() => {
      // will call get categories
      this.getEvents();
     
      //this.getAlarms();
    });
    // para mostrar los mensajes
    this.plt.ready().then(() => {
      this.localNotifications.on('click').subscribe(res => {
        console.log('click: ',res);
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });
      this.localNotifications.on('trigger').subscribe(res => {
        console.log('trigger: ',res);
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });
     });
  }
  showAlert(title: any, text: any, msg: any) {
    this.alertCtrl.create({
      header: title,
      subHeader: text,
      message: msg,
      buttons: ['Ok']
    }).then(alert => alert.present());
  }

  ngOnInit() {
  }
  back(){
    this.router.navigate(['home']);
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
          this.getEvents();
        });
    } else {
      // add category
      this.database.addEvent(this.eventName, this.eventMessage, this.eventDate, this.eventHour).then((data) => {
        // crear notificacion 
        
        /* this.localNotifications.schedule({
          id: this.idAlert,
          title: this.eventName ,
          text:  this.eventMessage,
          data: { mydata: 'Mi mensaje oculto es este schedule' },
          trigger: { at: new Date(parseInt(this.eventDate.substring(0,10).split("-")[0]), (parseInt(this.eventDate.substring(0,10).split("-")[1])-1),(parseInt(this.eventDate.substring(0,10).split("-")[2])), (parseInt(this.eventHour.substring(11,16).split(":")[0])), (parseInt(this.eventHour.substring(11,16).split(":")[1])) ) }
        }); */

        // --------------------
        this.eventName = "";
        this.eventMessage = "";
        this.eventDate = "";
        this.eventHour = "";
        this.idAlert = this.idAlert + 1;
        alert(data);
        this.getEvents();
      });
    }
    
  }
/* 
  getDato(){
    this.alarm.database.getEvent().then((data) => {
      this.datom="";
      if (data.rows.length > 0) {        
            this.datom = data.rows.item(0).message;
      }
    });
    return this.datom;
  } */
  getEvents() {
    
    this.database.getEvent().then((data) => {
      this.events = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
            this.events.push(data.rows.item(i));
        }
      }
    });
    
    this.alarm.createNotifications();
  }

  deleteEvent(id: number) {
    this.database.deleteEvent(id).then((data) => {
      alert(data);
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
  }

}
