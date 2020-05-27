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
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../services/snackbar.service';


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
    private router: Router,
    private snackbarService: SnackbarService
  ) {
    this.load = true;
    this.routeActive = routeActive;
  }

  ngOnInit(): void {
    this.auth.currentUser.subscribe(arg => {
      if (arg) {
        this.login = true;
      } else {
        this.login = false;
      }
    });

    this.routeActive.params.subscribe((params) => {
      this.dato = params.dato;
      this.cargar(this.dato);
    });
  }


  cargar(dato: string) {
    this.dataSource = new MatTableDataSource<any>();
    this.arrayespe = this.tabla[this.dato];
    this.displayedColumns = this.arrayespe.displayedColumns;
    this.columnas = this.arrayespe.columnas;
    switch (this.dato) {
      case 'fiestas':
        this.var = this.fiestasService.getFiestasNombres();
        break;
      case 'grupos':
        this.var = this.gruposService.getGruposBasico();
        break;
      case 'tipos':
        this.var = this.tiposService.getTiposBasico();
        break;
      case 'usuarios':
        this.var = this.auth.obtenerUsers();
        break;
    }
    this.var.subscribe((things) => {
      this.dataSource.data = things;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.load = false;
      this.snackbarService.success('Datos Cargados');
    },
      error => {
        this.snackbarService.error('Error:' + error);
        this.load = false;
      }
    );
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
      this.snackbarService.success('Evento eliminado');
      this.load = false;
      this.cargar(this.dato);
    },
      error => {
        this.snackbarService.error('Error:' + error);
      }
    );

  }

  public create() {
    const url = `/add/${this.dato}`;

    this.router.navigate([url]);
  }

}
