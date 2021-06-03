import { Component, ChangeDetectorRef } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { NavController, Platform  } from '@ionic/angular';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { Router } from '@angular/router';

import { AlarmService } from '../alarm.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  matches: string[];
  capture = "hola";
  isRecording = false;
  constructor( public navCtrl: NavController,private speechRecognition: SpeechRecognition,
    private plt: Platform, private cd: ChangeDetectorRef, public speech:TextToSpeech,
     private router: Router, public alarm: AlarmService) {
       this.alarm.createNotifications();
      
      }
  isIos() {
    return this.plt.is('ios');
  }

  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    });
  }
 
  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });
  }
 
  startListening() {
    let options = {
      language: 'en-US'
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.matches = matches;
      this.cd.detectChanges();
      this.capture = this.matches[0];
    });
    this.isRecording = true;
  }
    
  speak(){
    this.speech.speak(this.capture)
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
  }
  newEvent(){
    this.router.navigate(['new-event']);
  }
  listEvent(){
    this.router.navigate(['list-event']);
  }
  configEvent(){
    this.router.navigate(['config-event']);
  }
}
