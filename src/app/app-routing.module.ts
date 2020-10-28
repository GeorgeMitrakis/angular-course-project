import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'/recipes'
  },
  {
    path:'recipes',
    loadChildren: () => import('./recipes/recipes.module').then(module => module.RecipesModule)
  },
  {
    path:'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.module').then(module => module.ShoppingListModule)
  },
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)
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
