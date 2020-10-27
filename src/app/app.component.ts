import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';
import { Navtab } from './shared/app-enums.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    private logService: LoggingService,
    private authService: AuthService
  ){
    this.logService.logInBold('AppComponent.constructor()', 'blue');
  }

  ngOnInit() {
    this.logService.logInBold('AppComponent.ngOnInit()', 'blue');
    this.authService.autoLogin();
  }
}
