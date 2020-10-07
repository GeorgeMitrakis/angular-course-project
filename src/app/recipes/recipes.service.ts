import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipes: Recipe[] = [
    new Recipe('Angular', 'Google\'s Js Framework', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/250px-Angular_full_color_logo.svg.png'),
    new Recipe('React', 'Facebook\'s Js Library', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/800px-React-icon.svg.png'),
    new Recipe('Vue', 'The Community\'s Js Framework', 'https://vuejs.org/images/logo.png')
  ];

  recipeWasSelected = new EventEmitter<Recipe>();

  constructor() { }

  
}
