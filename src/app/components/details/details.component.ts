import { Component, OnInit } from '@angular/core';
import { FiestasService } from 'src/app/services/fiestas.service';
import { FiestaNombres } from '../../models/fiestas.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  var: any;
  detalle: FiestaNombres;
  constructor(    private fiestasService: FiestasService,
    ) { }

  ngOnInit(): void {
    this.var = this.fiestasService.getFiestaNombre(5);
    this.var.subscribe((things) => {
      console.log(things);
      this.detalle = things;
    });
console.log('fin peti');
console.log(this.var);

  }

}
