import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static:true}) ingredientName: ElementRef;
  @ViewChild('amountInput', {static:true}) ingredientAmount: ElementRef;
  
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onAddIngredient(){
    if(
      this.ingredientName.nativeElement.value!== '' 
      && this.ingredientAmount.nativeElement.value!== ''
      ){
        this.ingredientAdded.emit(
          new Ingredient(
            this.ingredientName.nativeElement.value, 
            this.ingredientAmount.nativeElement.value
          )
        )
    }
  }
}
