import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() {console.log(`%c LoggingService.constructor()`, `color: darkgrey; font-weight: bold;`)}

  log(message: string, color: string){
    console.log(`%c ${message}`, `color: ${color};`)
  }

  logInBold(message: string, color: string){
    console.log(`%c ${message}`, `color: ${color}; font-weight: bold;`)
  }
}
