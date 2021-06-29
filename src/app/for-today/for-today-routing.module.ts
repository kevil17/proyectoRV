import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForTodayPage } from './for-today.page';

const routes: Routes = [
  {
    path: '',
    component: ForTodayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForTodayPageRoutingModule {}
