import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
// import { RecipesModule } from './recipes/recipes.module';
import { ErrorPageModule } from './error-page/error-page.module';
// import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
// import { AuthModule } from './auth/auth.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    // AuthModule,
    // RecipesModule,
    // ShoppingListModule,
    ErrorPageModule  // order matters, because of the wildcard routes !!!
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
