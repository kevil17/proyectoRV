import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringProcessingService {

  constructor() { }
  processSpeech(capture: string){
    
    return "evento guardado";
  }
}
