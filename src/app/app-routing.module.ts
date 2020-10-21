import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeDetailEmptyComponent } from './recipes/recipe-detail-empty/recipe-detail-empty.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeRouteIdValidityGuard } from './recipes/recipe-route-id-validity.guard';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'/recipes'
  },
  {
    path:'auth',
    component:AuthComponent
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
        path:'new',
        component: RecipeEditComponent
      },
      {
        path:':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService],
        // canActivate: [RecipeRouteIdValidityGuard]
      },
      {
        path:':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService],
        // canActivate: [RecipeRouteIdValidityGuard]
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
