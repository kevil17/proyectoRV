import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigEventPageRoutingModule } from './config-event-routing.module';

import { ConfigEventPage } from './config-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigEventPageRoutingModule
  ],
  declarations: [ConfigEventPage]
})
export class ConfigEventPageModule {}
