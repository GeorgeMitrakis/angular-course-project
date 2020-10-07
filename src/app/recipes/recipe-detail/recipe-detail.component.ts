import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe

  constructor(private recipesService:RecipesService) {
    this.recipesService.recipeWasSelected.subscribe(
      (recipeSelected:Recipe) => this.recipe = recipeSelected
    )
  }

  ngOnInit(): void { 
  }

  isRecipeSelected(){
    return this.recipe !== undefined
  }
}
