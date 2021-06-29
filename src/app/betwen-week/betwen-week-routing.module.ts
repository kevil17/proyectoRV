import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BetwenWeekPage } from './betwen-week.page';

const routes: Routes = [
  {
    path: '',
    component: BetwenWeekPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BetwenWeekPageRoutingModule {}
