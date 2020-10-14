import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoggingService } from 'src/app/logging.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', {static:true}) ingredientName: ElementRef;
  // @ViewChild('amountInput', {static:true}) ingredientAmount: ElementRef;
  @ViewChild('shoppingListForm', {static:true}) shoppingListForm: NgForm;
  editMode:boolean = false;
  indexOfSelectedIngredient: number;
  selectedIngredient: Ingredient;
  indexSubscription: Subscription

  constructor(
    private shoppingListService: ShoppingListService,
    private logService:LoggingService
  ) { }

  ngOnInit(): void {
    this.indexSubscription = this.shoppingListService.ingredientSelectedByIndex.subscribe(
      (ingredientIndex: number) => {
        this.editMode = true;
        this.indexOfSelectedIngredient = ingredientIndex;
        this.selectedIngredient = this.shoppingListService.getIngredient(ingredientIndex)
        this.shoppingListForm.setValue({
          ingredientName: this.selectedIngredient.name,
          ingredientAmount: this.selectedIngredient.amount
        });
      }
    )
  }

  // onAddIngredient(){
  //   this.logService.log('ShoppingEditComponent.onAddIngredient()', '#009999')

  //   const name = this.ingredientName.nativeElement.value
  //   const amount = this.ingredientAmount.nativeElement.value
    
  //   if(name !== '' && amount !== ''){
  //       this.shoppingListService.onIngredientAdded(new Ingredient(name,amount))
  //   }
  // }

  onSubmit() {
    this.logService.log('ShoppingEditComponent.onSubmit()', '#229999')
    // console.log(shoppingListForm)

    if(this.editMode){
      this.ingredientEdit()
    }
    else{
      this.ingredientAdd()
    }

    this.shoppingListForm.reset()
  }

  onClear(){
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  ingredientAdd(){
    this.shoppingListService.onIngredientAdded(
      new Ingredient(
        this.shoppingListForm.value.ingredientName,
        this.shoppingListForm.value.ingredientAmount
      )
    )
  }

  ingredientEdit(){
    this.shoppingListService.onIngredientUpdated(
      this.indexOfSelectedIngredient,
      new Ingredient(
        this.shoppingListForm.value.ingredientName,
        this.shoppingListForm.value.ingredientAmount
      )
    )
    this.editMode = false;
  }




  ngOnDestroy() {
    this.indexSubscription.unsubscribe();
  }
}
