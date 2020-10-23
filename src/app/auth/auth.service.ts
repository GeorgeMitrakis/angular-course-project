import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators'



interface AuthResponseData{
  idToken: string;
  refreshToken: string;
  expiresIn: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiKey = "AIzaSyBMrO8sRUxrABfyaYZUug4d9bVoq6-FiH4";
  private firebaseAuthEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${this.apiKey}`;
  private jwt = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTYwMzMwNjUzMywiZXhwIjoxNjAzMzEwMTMzLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1sNG02bEBhbmd1bGFyLWNvbXBsZXRlLWd1aWRlLTQxNjdmLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstbDRtNmxAYW5ndWxhci1jb21wbGV0ZS1ndWlkZS00MTY3Zi5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6IjZNM2REcXZJR3NSZTh5eEZLM3p6WWk4V3oxRjIifQ.M2EEbPqAf9_ZeyBPZVIOLp7fDBfVdd6PzgAlCdOkF1ir4S_HYc_N5NyBrdDQOzJnvEDBIzP0XcXY6GIyzKY6ZzZOkfCYNCsiXkNRh9mGcLMtB8M8fOqZSm41LtFVqqpgI67ye3xlPlpKf6y5odaIMbXe_obacsoyUd_yMxbqpQzsU99z7FSJNU7YeRolAV-0vMa43oG2E2U-ki1ZTy1hVTD38-3eLjAOiBSiA_xgybaXAky48TU6Lea1FhAEhaLhqDvT8d35k528-CLbtRRa6ps9fDyMfeQOu2PpIUmUqv5r1aURi0AM3NYp5pYVuI1ca-M6axwbBZ8zWRJbvzlYbg"
  private uid = "Ohb8AHwAyXRcQtYxIt9aBHNYth92"

  constructor(private http:HttpClient) { }

  signup(email: string, password: string){
    return (this.http.post<AuthResponseData>(
      this.firebaseAuthEndpoint,
      {
        token: this.jwt,
        returnSecureToken: true
      }
    )
    .pipe(tap(event => {
      console.log(event)
    })))
  }
}
