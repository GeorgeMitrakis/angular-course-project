import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() {
    if(environment.production){
      return;
    }
    console.log(`%c LoggingService.constructor()`, `color: cornflowerblue; font-weight: bold;`)
  }

  log(message: string, color: string, fontWeight?:string){

    if(environment.production){
      return;
    }
    
    if(!fontWeight){
      fontWeight = 'normal';
    }
    console.log(`%c ${message}`, `color: ${color}; font-weight: ${fontWeight};`);
  }

}
