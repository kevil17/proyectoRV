import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../database.service';
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
  constructor(private router: Router, private route: ActivatedRoute, public database: DatabaseService) {
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
      // edit category
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
        this.router.navigate(['list-event']);
  }
  deleteEvent(id: number) {  // boton de eliminar
    this.data.deleteEvent(id).then((data) => {
      alert(data);
      /* this.getEvents(); */
    });
    this.router.navigate(['list-event']);
  }
  
  
}
