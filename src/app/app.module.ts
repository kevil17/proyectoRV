import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AlarmService } from './alarm.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [SpeechRecognition,TextToSpeech,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },SQLite, LocalNotifications, AlarmService],
  bootstrap: [AppComponent],
})
export class AppModule {}
