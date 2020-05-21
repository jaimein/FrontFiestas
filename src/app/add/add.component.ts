import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { GrupoBasico } from '../models/grupo.model';
import { GruposService } from '../services/grupos.service';
import { TiposService } from '../services/tipos.service';
import { AuthenticationService } from '../app-auth/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { TipoBasico } from '../models/tipo.model';
import { UbicacionService } from '../services/ubicacion.service';
import { comunidadesBasico, provinciaBasico, poblacionBasico, cpBasico } from '../models/ubicacion.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  ControlGroup = new FormControl();
  ControlTipo = new FormControl();
  ControlComunidad = new FormControl();
  ControlProvincia = new FormControl();
  ControlPoblacion = new FormControl();
  Controlcp = new FormControl();

  filteredGroup = new Observable<GrupoBasico[]>();
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  hasUnitNumber: any;
  routeActive: ActivatedRoute;
  AddForm = this.fb.group({
    date: null,
  });
  grupos: Observable<GrupoBasico[]>;
  gruposArr: GrupoBasico[];
  filteredTipos: Observable<TipoBasico[]>;
  filteredComunidad: Observable<comunidadesBasico[]>;
  filteredProvincia: Observable<provinciaBasico[]>;
  filteredPoblacion: Observable<poblacionBasico[]>;
  filteredcp: Observable<cpBasico[]>;


  mostrarProvincia = false;
  mostrarPoblacion = false;
  mostrarcp = false;


  constructor(
    routeActive: ActivatedRoute,
    private fb: FormBuilder,
    private gruposService: GruposService,
    private tiposService: TiposService,
    private ubicacionService: UbicacionService,
    private auth: AuthenticationService
  ) {
    this.routeActive = routeActive;
    this.filteredGroup = combineLatest(
      this.gruposService.getGruposBasico(),
      this.ControlGroup.valueChanges.pipe(startWith(''))
    ).pipe(
      map(([grupo, filterString]) =>
        grupo.filter(
          (g) =>
            g.descripcion.toLowerCase().indexOf(this.caseDown(filterString)) !==
            -1
        )
      )
    );
    this.filteredTipos = combineLatest(
      this.tiposService.getTiposBasico(),
      this.ControlTipo.valueChanges.pipe(startWith(''))
    ).pipe(
      map(([grupo, filterString]) =>
        grupo.filter(
          (g) =>
            g.descripcion.toLowerCase().indexOf(this.caseDown(filterString)) !==
            -1
        )
      )
    );
    this.filteredComunidad = combineLatest(
      this.ubicacionService.getComunidades(),
      this.ControlComunidad.valueChanges.pipe(startWith(''))
    ).pipe(
      map(([grupo, filterString]) =>
        grupo.filter(
          (g) =>
            g.nombre.toLowerCase().indexOf(this.caseDown(filterString)) !== -1
        )
      )
    );
  }

  ngOnInit() {}

  caseDown(cad: string) {
    if (typeof cad === 'string') {
      return cad.toLowerCase();
    }
  }
  getDescription(option) {
    if (option) {
      return option.descripcion;
    }
    return '';
  }

  getNombre(option) {
    if (option) {
      return option.nombre;
    }
    return '';
  }
  getCalle(option) {
    if (option) {
      return option.calle;
    }
    return '';
  }

  cargarProvincias(option) {
    this.mostrarProvincia = true;
    this.filteredProvincia = combineLatest(
      this.ubicacionService.getProvicias(option.id),
      this.ControlProvincia.valueChanges.pipe(startWith(''))
    ).pipe(
      map(([grupo, filterString]) =>
        grupo.filter(
          (g) =>
            g.nombre.toLowerCase().indexOf(this.caseDown(filterString)) !== -1
        )
      )
    );
  }

  cargarPoblaciones(option){
    this.mostrarPoblacion = true;
    this.filteredPoblacion = combineLatest(
      this.ubicacionService.getPoblaciones(option.id),
      this.ControlPoblacion.valueChanges.pipe(startWith(''))
    ).pipe(
      map(([grupo, filterString]) =>
        grupo.filter(
          (g) =>
            g.nombre.toLowerCase().indexOf(this.caseDown(filterString)) !== -1
        )
      )
    );
  }

  cargarCP(option){
    this.mostrarcp=true;
    var resp=this.ubicacionService.getCP(option.id);
    this.filteredcp = combineLatest(
      resp,
      this.Controlcp.valueChanges.pipe(startWith(''))
    ).pipe(
      map(([grupo, filterString]) =>
        grupo.filter(
          (g) =>
            g.calle.toLowerCase().indexOf(this.caseDown(filterString)) !== -1
        )
      )
    );
  }
  /*   private _filterGroup(value: string): GrupoBasico[] {
    const filterValue = value.toLowerCase();

    return this.grupos.filter(option => option.toLowerCase().includes(filterValue));
  } */

  onSubmit() {
    alert('Thanks!');
  }
}
