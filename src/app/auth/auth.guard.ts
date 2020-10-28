import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { LoggingService } from '../logging.service';
import { AuthService } from './auth.service';
import { UserRole } from './user-role.enum';
import { SimpleUser, User } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{

    constructor(
        private authService: AuthService,
        private logService: LoggingService,
        private router: Router
    ){
        this.logService.log('AuthGuard.constructor()','green', 'bold')
    }

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        this.logService.log('AuthGuard.canActivate()','green', 'bold')

        return this.authService.user.pipe(
            take(1),    // emit user Subject only once per Guard run, and unsubscribe. avoids nasty bugs
            tap(user => {
                this.logService.log('AuthGuard.canActivate() -> user: ','green', 'bold')
                console.log(user)
            }),
            map((user: User) => {
                const isAuth = (user.role !== UserRole.Guest && !(<SimpleUser>user).isUserTokenExpired())
                if(isAuth){
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
            })
            //// The following was used in previous angular versions, instead of terutning a url tree. 
            //// On some edge cases however, this could lead to race conditions with multiple redirects.

            // tap((isAuth:boolean) => {
            //     if(!isAuth){
            //         this.router.navigate(['/auth'])
            //     }
            // })
        );
    }
}