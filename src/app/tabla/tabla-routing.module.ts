import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablaComponent } from './tabla.component';

const routes: Routes = [{ path: ':dato', component: TablaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablaRoutingModule { }
