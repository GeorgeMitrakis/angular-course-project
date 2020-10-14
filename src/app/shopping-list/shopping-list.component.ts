import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private ingredientsChangedSub: Subscription;
  ingredients: Ingredient[]
  selectedIngredientIndex: number;


  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients()
    this.ingredientsChangedSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => this.ingredients = ingredients
    )
  }
  onSelect(ingredientIndex: number){
    // console.log(ingredientIndex)
    this.selectedIngredientIndex = ingredientIndex
    this.shoppingListService.onIngredientSelectedByIndex(ingredientIndex)
  }

  ngOnDestroy(){
    this.ingredientsChangedSub.unsubscribe()
  }  
}
