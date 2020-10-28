import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RecipeDetailEmptyComponent } from './recipe-detail-empty/recipe-detail-empty.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';

@NgModule({
    declarations:[
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeDetailEmptyComponent,
        RecipeEditComponent,
    ],
    imports:[
        CommonModule,   // instead of BrowserModule, which must be imported only to the AppModule
        // RouterModule,
        ReactiveFormsModule,
        RecipesRoutingModule
    ]
})
export class RecipesModule{}