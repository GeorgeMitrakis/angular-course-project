import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http'
import { AuthService } from './auth.service';
import { LoggingService } from '../logging.service';
import { exhaustMap, take } from 'rxjs/operators';
import { SimpleUser, User } from './user.model';
import { UserRole } from './user-role.enum';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private logService: LoggingService
    ){
        this.logService.logInBold('AuthInterceptor.constructor()', 'violet')
    }

    intercept(req: HttpRequest<any>, next: HttpHandler){
        this.logService.logInBold('AuthInterceptor.intercept()', 'violet')
        return this.authService.user
            .pipe(
                take(1), // take only 1 value from an observable, then unsubscribe
                exhaustMap((user: User) => {  // used to return an http get<> observable instead of a user one
                    
                    if(user.role !== UserRole.Simple){
                        return next.handle(req);
                    }
                    else{
                        const authReq = req.clone({
                            params: new HttpParams().set('auth', (<SimpleUser>user).token)
                        })
                        return next.handle(authReq);
                    }
                    
                })
            )

    }
}