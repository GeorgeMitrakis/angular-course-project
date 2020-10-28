import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page.component';


const routes: Routes = [
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
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ErrorPageModule{}