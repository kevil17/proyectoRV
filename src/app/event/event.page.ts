import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { ListEventPage } from '../list-event/list-event.page';
@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  data: any;
  eventName: string = "";
  eventMessage: string = "";
  eventDate: string = "";
  eventHour: string = "";

  events: any = [];
  editMode: boolean = false;
  editId: number = 0;
  list: ListEventPage;
  constructor(private router: Router, private route: ActivatedRoute, 
    public database: DatabaseService) {
      /* this.database.createDatabase().then(() => {}); */

    this.data = this.route.snapshot.data['data'];
    this.editMode = true;
    this.eventName = this.data.name_event;
    this.eventMessage = this.data.message;
    this.eventDate = this.data.date;
    this.eventHour = this.data.hour;
    this.editId = this.data.id;
   }

  ngOnInit() {
  }
  back(){
    this.router.navigate(['list-event']);
  }
  cancel(){  // boton de cancelar
    this.router.navigate(['list-event']);
  }
  editDatabase(){  // boton de ok
      this.database
        .editEvent(this.eventName,this.eventMessage, this.eventDate, this.eventHour, this.editId)
        .then((data) => {
          this.eventName = "";
          this.eventMessage = "";
          this.eventDate = "";
          this.eventHour = "";
          (this.editId = 0);
          alert(data);
          
        });  
       //this.list.getEvents; 
        this.router.navigate(['home']);
  }
  deleteEvent() {  // boton de eliminar
    this.database.deleteEvent(this.editId).then((data) => {
      alert(data);
      /* this.getEvents(); */
      /* this.listevent.getEvents(); */
    });
    
    this.router.navigate(['home']);
    /* var list: ListEventPage;
    list.getEvents(); */
  }
  
  
  
}
