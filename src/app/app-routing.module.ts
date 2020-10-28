import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ErrorPageComponent } from './error-page/error-page.component';
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
    path:'shopping-list',
    component: ShoppingListComponent
  },
  // {
  //   path:'error-page',
  //   component: ErrorPageComponent,
  //   data: { errorMsg: 'Page not found!' }
  // },
  // {
  //   path:'**',
  //   redirectTo:'error-page'
  // }
  
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
