import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const appRoutes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'/recipes'
  },
  {
    path:'recipes',
    component: RecipesComponent
  },
  {
    path:'shopping-list',
    component: ShoppingListComponent
  },
  {
    path:'error-page',
    component: ErrorPageComponent,
    data: { errorMsg: 'Page not found!' }
  },
  {
    path:'**',
    redirectTo:'error-page'
  }
  
]


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
