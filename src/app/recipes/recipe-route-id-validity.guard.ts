import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggingService } from '../logging.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeRouteIdValidityGuard implements CanActivate {
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private logService: LoggingService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    this.logService.logInBold('RecipeRouteIdValidityGuard.canActivate() -> ActivatedRouteSnapshot','purple')
    console.log(route)
    this.logService.logInBold('RecipeRouteIdValidityGuard.canActivate() -> RouterStateSnapshot','purple')
    console.log(state)
    
    const recipesAmount: number = this.recipeService.getRecipes().length
    const recipeIdInRoute: number = route.params['id']
    
    if((!Number.isNaN(recipeIdInRoute)) && 
      (recipeIdInRoute >= 0) &&
      (recipeIdInRoute < recipesAmount)){
        return true
    }
    else{
      this.router.createUrlTree(['/error-page'])
    }
  }
  
}
