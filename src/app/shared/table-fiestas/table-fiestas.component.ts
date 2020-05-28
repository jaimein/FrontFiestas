import { Component, OnInit, ViewChild } from '@angular/core';
import { FiestasService } from '../../services/fiestas.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { FiestaNombres } from '../../models/fiestas.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import infoTabla from '../../../assets/confTabla.json';
import { GruposService } from '../../services/grupos.service';
import { TiposService } from '../../services/tipos.service';

@Component({
  selector: 'app-table-fiestas',
  templateUrl: './table-fiestas.component.html',
  styleUrls: ['./table-fiestas.component.css'],
})
export class TableFiestasComponent implements OnInit {
  dato = 'fiestas';
  tabla = infoTabla;
  arrayespe = this.tabla[this.dato];
  /*displayedColumns = [
    'fecha',
    'nombreGrupo',
    'nombreTipo',
    'localidad',
    'zona',
  ];*/
  displayedColumns = this.arrayespe.displayedColumns ;
  columnas = this.arrayespe.columnas;
  dataSource = new MatTableDataSource<any>();


var: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private fiestasService: FiestasService, private gruposService: GruposService, private tiposService: TiposService) {
    const service = obtenerServicios(this.dato);
    console.log(this.columnas);
    console.log(this.arrayespe);

  }


  ngOnInit(): void {
    switch (this.dato) {
      case 'fiestas': console.log(this.dato);
                      this.var = this.fiestasService.getFiestasNombres();
                      break;
      case 'grupos': console.log(this.dato);
                     this.var = this.gruposService.getGruposBasico();
                     break;
      case 'tipos': console.log(this.dato);
                    this.var = this.tiposService.getTiposBasico();
                    break;
  }

    this.var.subscribe(things => {
      this.dataSource.data = things;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  });

  }



}

function obtenerServicios(titulo: string) {
  switch (titulo) {
    case 'fiestas': console.log(titulo);
                    return FiestasService;
                    break;
    case 'prueba': console.log(titulo);
                   return FiestasService;
                   break;
    case 'tres': console.log(titulo);
                 return FiestasService;
                 break;
}
}
