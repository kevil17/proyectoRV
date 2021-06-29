import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BetwenWeekPageRoutingModule } from './betwen-week-routing.module';

import { BetwenWeekPage } from './betwen-week.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BetwenWeekPageRoutingModule
  ],
  declarations: [BetwenWeekPage]
})
export class BetwenWeekPageModule {}
