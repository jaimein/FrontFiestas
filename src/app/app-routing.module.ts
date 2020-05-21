import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { TableFiestasComponent } from './components/table-fiestas/table-fiestas.component';
import { TablaComponent } from './tabla/tabla.component';
import { AuthGuard } from './app-auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { DetailsComponent } from './components/details/details.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'fiestas',
    component: TableFiestasComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'details',
    component: DetailsComponent
  },
  { path: 'tabla', loadChildren: () => import('./tabla/tabla.module').then(m => m.TablaModule) },
  { path: 'add', loadChildren: () => import('./add/add.module').then(m => m.AddModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
