import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';

import { catchError, tap } from 'rxjs/operators'
import { User } from './user.model';



export interface AuthResponseData{
  idToken: string;
  email:string;
  refreshToken: string;
  expiresIn: string;
  localId:string;
  registered?:boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new Subject<User>();

  private firebaseAPI = "https://identitytoolkit.googleapis.com/v1/accounts";
  
  private signUpRoute = "signUp";
  private signInRoute = "signInWithPassword";

  private apiKey = "AIzaSyBMrO8sRUxrABfyaYZUug4d9bVoq6-FiH4";

  constructor(private http:HttpClient) { }

  signup(email: string, password: string){
    const signUpEndpoint = `${this.firebaseAPI}:${this.signUpRoute}?key=${this.apiKey}`

    return (
      this.http.post<AuthResponseData>(
        signUpEndpoint,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
          catchError(this.handleError),
          tap(this.handleAuthentication)
      )
    )
  }

  login(email: string, password:string){
    const signInEndpoint = `${this.firebaseAPI}:${this.signInRoute}?key=${this.apiKey}`

    return (
      this.http.post<AuthResponseData>(
        signInEndpoint,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(this.handleAuthentication)
      )
    ) 
  }

  private handleAuthentication(resData: AuthResponseData){
    const tokenExpirationDate = new Date(new Date().getTime() + Number(resData.expiresIn)*1000);
    this.user.next(
      new User(
        resData.email,
        resData.localId,
        resData.idToken,
        tokenExpirationDate
      )
    )
  }

  private handleError(errorRes: HttpErrorResponse){
    console.log(errorRes)
    let errorMessage: string = 'An unknown error occured!';
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage)
    }

    switch(errorRes.error.error.message){
      case  'EMAIL_EXISTS':
        errorMessage = 'Email already exists';
        break;
      case  'EMAIL_NOT_FOUND':
        errorMessage = 'Email not found';
        break;
      case  'INVALID_PASSWORD':
        errorMessage = 'The password is invalid';
        break;          
    }

    return throwError(errorMessage)

  }
}
