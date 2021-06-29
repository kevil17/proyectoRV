import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForTodayPageRoutingModule } from './for-today-routing.module';

import { ForTodayPage } from './for-today.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForTodayPageRoutingModule
  ],
  declarations: [ForTodayPage]
})
export class ForTodayPageModule {}
