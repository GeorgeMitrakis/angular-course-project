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
  isLoading:boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(authForm: NgForm) {
    // console.log(authForm)
    this.isLoading = true;
    if(!this.isLoginMode){
      this.authService.signup(
        authForm.value.email,
        authForm.value.password
      )
      .subscribe(
        authResponse => {
          console.log(authResponse);
          this.isLoading = false;
        },
        error => {
          console.log(error);
          this.isLoading = false;
        }
      )
    }

    
    authForm.reset()
  }

}
