import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe

  constructor(private recipeService:RecipeService) {
    this.recipeService.recipeSelected.subscribe(
      (recipeSelected:Recipe) => this.recipe = recipeSelected
    )
  }

  ngOnInit(): void { 
  }

  isRecipeSelected(){
    return this.recipe !== undefined
  }
}
