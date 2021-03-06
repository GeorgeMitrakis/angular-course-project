import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[]
  recipesSubscription: Subscription

  constructor(
    private recipeService:RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes()
    this.recipesSubscription = this.recipeService.recipesChanged.subscribe(
      (newRecipes: Recipe[]) => this.recipes = newRecipes
    )
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  ngOnDestroy() {
    this.recipesSubscription.unsubscribe()
  }
}
