import { Component, OnInit, ViewChild, SimpleChanges, SimpleChange } from '@angular/core';
import { FiestasService } from '../services/fiestas.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { GruposService } from '../services/grupos.service';
import { TiposService } from '../services/tipos.service';
import infoTabla from '../../assets/confTabla.json';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/app-auth/authentication.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
})
export class TablaComponent implements OnInit {
  dato = 'grupos';
  tabla = infoTabla;
  arrayespe = null;
  displayedColumns = null;
  columnas = null;
  dataSource = new MatTableDataSource<any>();
  var: any;
  routeActive: ActivatedRoute;
  // auth: AuthenticationService;
  login = false;
  load = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(
    routeActive: ActivatedRoute,
    private fiestasService: FiestasService,
    private gruposService: GruposService,
    private tiposService: TiposService,
    private auth: AuthenticationService,
    private router: Router
  ) {
    this.load = true;
    this.routeActive = routeActive;
    console.log(this.load);

  }
  ngOnInit(): void {
    console.log('init');
    this.auth.currentUser.subscribe(arg => {if (arg) {
      // console.log('login');
      this.login = true;
    } else {
      this.login = false;
      // console.log('nooooo');
    }});

    this.routeActive.params.subscribe((params) => {
      this.dato = params.dato;
      this.cargar(this.dato);


    });
  }


  cargar(dato: string) {
    console.log('ejecuta fcargar' + dato);
    this.dataSource = new MatTableDataSource<any>();
    this.arrayespe = this.tabla[this.dato];
    this.displayedColumns = this.arrayespe.displayedColumns;
    this.columnas = this.arrayespe.columnas;
    switch (this.dato) {
      case 'fiestas':
        console.log(this.dato);
        this.var = this.fiestasService.getFiestasNombres();
        break;
      case 'grupos':
        console.log(this.dato);
        this.var = this.gruposService.getGruposBasico();
        break;
      case 'tipos':
        console.log(this.dato);
        this.var = this.tiposService.getTiposBasico();
        break;
    }
    this.var.subscribe((things) => {
      this.dataSource.data = things;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.load = false;
      console.log(this.load);
    });
  }

  public redirectToDetails = (id: string) => {
    const url = `/details/${id}`;
    this.router.navigate([url]);
  }

  public redirectToUpdate = (id: string) => {
    const url = `/add/fiestas/${id}`;
    this.router.navigate([url]);
  }

  public redirectToDelete = (id: number) => {
    this.fiestasService.eliminarFiesta(id).subscribe(x => {
      console.log('fiesta eliminada');
      this.load = false;
      this.cargar(this.dato);
}

);
  }

  public create(){
    const url = `/add/${this.dato}`;

    this.router.navigate([url]);
  }

}
