import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './shared/contact/contact.component';
import { TableFiestasComponent } from './shared/table-fiestas/table-fiestas.component';
import { TablaComponent } from './tabla/tabla.component';
import { AuthGuard } from './security/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { DetailsComponent } from './components/details/details.component';
import { RegistroComponent } from './components/registro/registro.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
/*   {
    path: 'fiestas',
    component: TableFiestasComponent,
    //canActivate: [AuthGuard]
  }, */
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'details',
    component: DetailsComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  { path: 'tabla', loadChildren: () => import('./tabla/tabla.module').then(m => m.TablaModule) },
  { path: 'add', loadChildren: () => import('./add/add.module').then(m => m.AddModule), canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
