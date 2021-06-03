import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AlertController, Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AlarmService {
  eventName: string = "";
  eventMessage: string = "";
  eventDate: string = "";
  eventHour: string = "";

  events: any = [];
  editId: number = 0;

  notfDelete: boolean = false;
  constructor(public database: DatabaseService,
    private localNotifications: LocalNotifications,
    private alertCtrl: AlertController, private plt: Platform) { 
      this.database.createDatabase().then(() => {
        //this.getEvents();
        //this.createNotifications();
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
    createNotifications() {
      this.deleteNotifications();
      this.database.getEvent().then((data) => {
        this.events = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
              const element = data.rows.item(i);
              this.eventName = element.name_event;
              this.eventMessage = element.message;
              this.eventDate = element.date;
              this.eventHour = element.hour;
              this.editId = element.id;
              this.localNotifications.schedule({
                id: this.editId,
                title: this.eventName ,
                text:  this.eventMessage,
                data: { mydata: 'Mi mensaje oculto es este schedule' },
                trigger: { at: new Date(parseInt(this.eventDate.substring(0,10).split("-")[0]), (parseInt(this.eventDate.substring(0,10).split("-")[1])-1),(parseInt(this.eventDate.substring(0,10).split("-")[2])), (parseInt(this.eventHour.substring(11,16).split(":")[0])), (parseInt(this.eventHour.substring(11,16).split(":")[1])) ) }
              });
          }
        }
      });
    }
    deleteNotifications(){
        this.localNotifications.cancelAll();
        this.localNotifications.clearAll();
    }
 
}
