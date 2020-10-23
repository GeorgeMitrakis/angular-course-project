import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

import { catchError, tap } from 'rxjs/operators'



interface AuthResponseData{
  idToken: string;
  refreshToken: string;
  expiresIn: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
        catchError(
          errorRes => {
            if(!errorRes.error || !errorRes.error.error){
              return throwError(errorRes)
            }

            return throwError(`Signup error: ${errorRes.error.error.message.replace("_", " ").toLowerCase()}`)
          }
        )
      )
    )
  }
}
