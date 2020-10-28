import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { RecipeDetailEmptyComponent } from './recipe-detail-empty/recipe-detail-empty.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes-resolver.service';
import { RecipesComponent } from './recipes.component';


const routes: Routes = [
    {
        path:'recipes',
        component: RecipesComponent,
        canActivate: [AuthGuard],
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
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class RecipesRoutingModule{}