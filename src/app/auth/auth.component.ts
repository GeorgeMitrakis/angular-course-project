import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode:boolean = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(authForm: NgForm) {
    // console.log(authForm)
    if(!this.isLoginMode){
      this.authService.signup(
        authForm.value.email,
        authForm.value.password
      )
      .subscribe(
        authResponse => {
          console.log(authResponse)
        },
        error => {
          console.log(error)
        }
      )
    }

    
    authForm.reset()
  }

}
