import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddComponent } from './add.component';
import { SimpleComponent } from './simple/simple.component';

const routes: Routes = [
  {
    path: 'fiesta'
  , component: AddComponent
},  {
  path: 'tipo'
, component: SimpleComponent
},  {
  path: 'grupo'
, component: SimpleComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRoutingModule { }
