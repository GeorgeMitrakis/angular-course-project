import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeDetailEmptyComponent } from './recipes/recipe-detail-empty/recipe-detail-empty.component';

const appRoutes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'/recipes'
  },
  {
    path:'recipes',
    component: RecipesComponent,
    children:[
      {
        path:'',
        component: RecipeDetailEmptyComponent
      },
      {
        path:':id',
        component: RecipeDetailComponent
      }
    ]
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