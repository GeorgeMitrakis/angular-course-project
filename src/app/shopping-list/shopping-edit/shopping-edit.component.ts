import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static:true}) ingredientName: ElementRef;
  @ViewChild('amountInput', {static:true}) ingredientAmount: ElementRef;
    
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddIngredient(){

    const name = this.ingredientName.nativeElement.value
    const amount = this.ingredientAmount.nativeElement.value
    
    if(name !== '' && amount !== ''){
        this.shoppingListService.onIngredientAdded(new Ingredient(name,amount))
    }
  }
}
