import { Component, ChangeDetectorRef } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { NavController, Platform  } from '@ionic/angular';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { Router } from '@angular/router';

import { AlarmService } from '../alarm.service';
import { StringProcessingService } from '../string-processing.service';

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
     private router: Router, private alarm: AlarmService, private stringProcessing: StringProcessingService) {
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
      language: 'es-ES',
    }
    this.speechRecognition.startListening(options).subscribe(matches => {
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
    alert(this.stringProcessing.processSpeech(this.capture));
  }
  newEvent(){
    this.router.navigate(['reminders']);
  }
  listEvent(){
    this.router.navigate(['list-event']);
  }
  configEvent(){
    this.router.navigate(['config-event']);
  }
}
