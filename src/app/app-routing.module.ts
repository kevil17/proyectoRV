import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataResolverService } from './data-resolver.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'list-event',
    loadChildren: () => import('./list-event/list-event.module').then( m => m.ListEventPageModule)
  },
  {
    path: 'config-event',
    loadChildren: () => import('./config-event/config-event.module').then( m => m.ConfigEventPageModule)
  },
  {
    path: 'new-event',
    loadChildren: () => import('./new-event/new-event.module').then( m => m.NewEventPageModule)
  },
  {
    path: 'event',
    loadChildren: () => import('./event/event.module').then( m => m.EventPageModule),
    resolve: {
      data: DataResolverService
    }
  },  {
    path: 'reminders',
    loadChildren: () => import('./reminders/reminders.module').then( m => m.RemindersPageModule)
  },
  {
    path: 'betwen-week',
    loadChildren: () => import('./betwen-week/betwen-week.module').then( m => m.BetwenWeekPageModule)
  },
  {
    path: 'for-today',
    loadChildren: () => import('./for-today/for-today.module').then( m => m.ForTodayPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
