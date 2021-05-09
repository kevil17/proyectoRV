import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-config-event',
  templateUrl: './config-event.page.html',
  styleUrls: ['./config-event.page.scss'],
})
export class ConfigEventPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  back(){
    this.router.navigate(['home']);
  }
}
