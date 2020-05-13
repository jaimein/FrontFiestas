import { Component, OnInit, ViewChild } from '@angular/core';
import { FiestasService } from '../../services/fiestas.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { FiestaNombres } from '../../models/fiestas.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-fiestas',
  templateUrl: './table-fiestas.component.html',
  styleUrls: ['./table-fiestas.component.css'],
})
export class TableFiestasComponent implements OnInit {
  dataSource = new MatTableDataSource<FiestaNombres>();
  displayedColumns = [
    'fecha',
    'nombreGrupo',
    'nombreTipo',
    'localidad',
    'zona',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<FiestaNombres>;

  constructor(private fiestasService: FiestasService) {}

  ngOnInit(): void {
    this.fiestasService.getFiestasNombres().subscribe(things => {
      this.dataSource.data = things;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  });

  }

}

