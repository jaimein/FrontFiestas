import { Component, OnInit } from '@angular/core';
import { FiestasService } from '../../services/fiestas.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { FiestaNombres } from '../../models/fiestas.model';

@Component({
  selector: 'app-table-fiestas',
  templateUrl: './table-fiestas.component.html',
  styleUrls: ['./table-fiestas.component.css']
})
export class TableFiestasComponent implements OnInit {

  dataSource = new FiestaNombresDataSource(this.fiestasService);
  //displayedColumns = ['nombreGrupo'];
  displayedColumns = ['id', 'zona', 'fecha', 'nombreGrupo', 'nombreTipo', 'localidad'];

  constructor(private fiestasService: FiestasService) { }

  ngOnInit(): void {
  }

}


export class FiestaNombresDataSource extends DataSource<any>{
  constructor(private fiestaService: FiestasService){
    super();
  }

  connect(): Observable<FiestaNombres[]>{
    console.log('obs');
    console.log(this.fiestaService.getFiestasNombres());
    return this.fiestaService.getFiestasNombres();
  }

  disconnect() {}
}
