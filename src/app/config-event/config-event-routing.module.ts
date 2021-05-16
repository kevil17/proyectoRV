import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigEventPage } from './config-event.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigEventPageRoutingModule {}
