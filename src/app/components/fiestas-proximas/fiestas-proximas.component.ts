import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { FiestaNombres, FiestaNumeroDias } from '../../models/fiestas.model';
import { FiestasService } from '../../services/fiestas.service';

@Component({
  selector: 'app-fiestas-proximas',
  templateUrl: './fiestas-proximas.component.html',
  styleUrls: ['./fiestas-proximas.component.css']
})
export class FiestasProximasComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Numero de fiestas en los proximos dias' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
          display: true
      }]
  }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#3f51b5',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];
  public datosFiesta: FiestaNumeroDias[];

  constructor(private fiestasService: FiestasService) { }

  ngOnInit() {
    this.fiestasService.obtenerNumeroFiestas().subscribe(x => {
      console.log(x);
      this.datosFiesta = x;
      this.lineChartData[0].data = this.datosFiesta.map(m => m.count);
      this.lineChartLabels = this.datosFiesta
      .map(m => `${new Date(Date.parse(m.fecha.toString())).toDateString()}`);
      console.log(this.lineChartLabels);
      console.log(this.lineChartData[0].data);
    }
    );
  }


/*   @Input()
  set mediciones(datos: MedicionGlucosa[]) {
      const fechaInicial = new Date();
      fechaInicial.setMonth(fechaInicial.getMonth() - 1);

      const ultimoMes = datos.filter(f =>
          new Date(Date.parse(f.Fecha.toString())) >= fechaInicial);

      this.lineChartData[0].data = ultimoMes.map(m => m.Nivel);
      this.lineChartLabels = ultimoMes
          .map(m => `${m.Comida} ${m.AntesDespues} ${new Date(Date.parse(m.Fecha.toString())).toDateString()}`);
  } */
}
