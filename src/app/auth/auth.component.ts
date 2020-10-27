import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode:boolean = true;
  isLoading:boolean = false;
  errorMsg: string = '';
  errorExists: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(authForm: NgForm) {
    // console.log(authForm)
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>

    if(!this.isLoginMode){
      authObs = this.authService.signup(
        authForm.value.email,
        authForm.value.password
      )      
    }
    else{
      authObs = this.authService.login(
        authForm.value.email,
        authForm.value.password  
      )
    }

    authObs.subscribe(
      authResponse => {
        console.log(authResponse);
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      errorMessage => {
        this.errorExists = true;
        this.errorMsg = errorMessage
        this.isLoading = false;
      }
    )

    
    authForm.reset()
  }

  onAlertClose(){
    this.errorExists = false;
    this.errorMsg = '';
  }

}
