import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';

import { catchError, tap } from 'rxjs/operators'
import { UserRole } from './user-role.enum';
import { SimpleUser, User, GuestUser, AdminUser } from './user.model';



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
  user = new BehaviorSubject<User>(new GuestUser());

  private firebaseAPI = "https://identitytoolkit.googleapis.com/v1/accounts";
  
  private signUpRoute = "signUp";
  private signInRoute = "signInWithPassword";

  private apiKey = "AIzaSyBMrO8sRUxrABfyaYZUug4d9bVoq6-FiH4";

  constructor(
    private http:HttpClient,
    private router: Router
  ) { }

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
          // tap(this.handleAuthentication.bind(this))
          tap(resData => this.handleAuthentication(resData))
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
        // tap(this.handleAuthentication.bind(this))
        tap(resData => this.handleAuthentication(resData))
      )
    ) 
  }

  autoLogin(){
    const userData: {
      role:string,
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'))
    if(!userData){
      return;
    }

    let loadedUser: User;

    switch(userData.role){
      case(UserRole.Admin):
        loadedUser = new AdminUser();
        break;
      case(UserRole.Simple):
        loadedUser = new SimpleUser(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );
        break;
      case(UserRole.Guest):
        loadedUser = new GuestUser()
        break;
      default:
        loadedUser = new GuestUser()
    }

    this.user.next(loadedUser);
  }

  logout(){
    this.user.next(new GuestUser())
    this.router.navigate(['/auth'])
  }

  private handleAuthentication(resData: AuthResponseData){

    const tokenExpirationDate = new Date(
      new Date().getTime() + Number(resData.expiresIn)*1000   //  current time + token lifespan returned from the API
    );

    const user = new SimpleUser(
      resData.email,
      resData.localId,
      resData.idToken,
      tokenExpirationDate
    );

    this.user.next(user);

    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse){
    console.log(errorRes);
    let errorMessage: string = 'An unknown error occured!';
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
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

    return throwError(errorMessage);

  }
}
