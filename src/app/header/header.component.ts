import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Navtab } from '../shared/app-enums.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() tabClicked = new EventEmitter<Navtab>();

  constructor() { }

  ngOnInit(): void {
  }

  onRecipesClick() {
    this.tabClicked.emit(Navtab.recipes)
  }

  onShoppingListClick(){
    this.tabClicked.emit(Navtab.shoppingList)
  }

}
