import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() {console.log(`%c LoggingService.constructor()`, `color: darkgrey; font-weight: bold;`)}

  log(message: string, color: string, fontWeight?:string){
    if(!fontWeight){
      fontWeight = 'normal';
    }
    console.log(`%c ${message}`, `color: ${color}; font-weight: ${fontWeight};`);
  }

}
