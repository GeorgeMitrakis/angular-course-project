import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoggingService } from 'src/app/logging.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  // @ViewChild('nameInput', {static:true}) ingredientName: ElementRef;
  // @ViewChild('amountInput', {static:true}) ingredientAmount: ElementRef;
    
  constructor(
    private shoppingListService: ShoppingListService,
    private logService:LoggingService
  ) { }

  ngOnInit(): void {
  }

  // onAddIngredient(){
  //   this.logService.log('ShoppingEditComponent.onAddIngredient()', '#009999')

  //   const name = this.ingredientName.nativeElement.value
  //   const amount = this.ingredientAmount.nativeElement.value
    
  //   if(name !== '' && amount !== ''){
  //       this.shoppingListService.onIngredientAdded(new Ingredient(name,amount))
  //   }
  // }

  onSubmit(shoppingListForm: NgForm) {
    this.logService.log('ShoppingEditComponent.onSubmit()', '#229999')
    // console.log(shoppingListForm)

    this.shoppingListService.onIngredientAdded(
      new Ingredient(
        shoppingListForm.value.ingredientName,
        shoppingListForm.value.ingredientAmount
      )
    )

    shoppingListForm.reset()
  }
}
