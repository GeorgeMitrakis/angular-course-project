import { Component } from '@angular/core';
import { Navtab } from './shared/app-enums.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tabActive: Navtab = Navtab.recipes;
  
  onTabClicked(tabClicked: Navtab){
    this.tabActive = tabClicked
  }

  isRecipesActive() {
    return this.tabActive === Navtab.recipes
  }

  isShoppingListActive() {
    return this.tabActive === Navtab.shoppingList
  }
}
