import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { LoggingService } from '../logging.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private logService: LoggingService
  ) { 
    this.logService.log('RecipesResolverService.constructor()', 'pink', 'bold')
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    this.logService.log('RecipesResolverService.resolve()', 'pink', 'bold')
    
    return (
      (this.recipeService.getRecipes().length === 0) ?
      this.dataStorageService.fetchRecipes() :   // the resolve method subscribes to this returned observable for us
      this.recipeService.getRecipes()
    )
  }
}
