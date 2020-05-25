import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShellComponent } from './shell/shell.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ContactComponent } from './contact/contact.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TableFiestasComponent } from './components/table-fiestas/table-fiestas.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FiestasService } from './services/fiestas.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LoginComponent } from './components/login/login.component';
import { errorInterceptorProvider } from './app-auth/errors.interceptor';
import { jwtInterceptorProvider } from './app-auth/jwt.interceptor';
import { DetailsComponent } from './components/details/details.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ChartsModule } from 'ng2-charts';
import { FiestasProximasComponent } from './components/fiestas-proximas/fiestas-proximas.component';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    HomeComponent,
    ContactComponent,
    TableFiestasComponent,
    LoginComponent,
    DetailsComponent,
    RegistroComponent,
    FiestasProximasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ChartsModule,
  ],
  providers: [FiestasService, { provide: LOCALE_ID, useValue: 'es' }, errorInterceptorProvider,    jwtInterceptorProvider,],
  bootstrap: [AppComponent],
})
export class AppModule {}
