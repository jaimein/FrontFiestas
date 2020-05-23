import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { GrupoBasico } from '../models/grupo.model';
import { GruposService } from '../services/grupos.service';
import { TiposService } from '../services/tipos.service';
import { AuthenticationService } from '../app-auth/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { map, startWith, subscribeOn } from 'rxjs/operators';
import { TipoBasico } from '../models/tipo.model';
import { UbicacionService } from '../services/ubicacion.service';
import { comunidadesBasico, provinciaBasico, poblacionBasico, cpBasico } from '../models/ubicacion.model';
import { FiestasService } from '../services/fiestas.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  AddForm: FormGroup;

  FiestaForm = new FormGroup({
    ControlFecha: new FormControl(''),
    ControlHora: new FormControl(''),
    ControlGroup: new FormControl(''),
    ControlTipo: new FormControl(''),
    ControlComunidad: new FormControl(''),
    ControlProvincia: new FormControl(''),
    ControlPoblacion: new FormControl(''),
    ControlCp: new FormControl(''),
  });
  // ControlGroup = new FormControl();
  // ControlTipo = new FormControl();
  // ControlComunidad = new FormControl();
  // ControlProvincia = new FormControl();
  // ControlPoblacion = new FormControl();
  // Controlcp = new FormControl();

  filteredGroup = new Observable<GrupoBasico[]>();
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  hasUnitNumber: any;
  routeActive: ActivatedRoute;

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
    private auth: AuthenticationService,
    private fiestasService: FiestasService
  ) {
    this.routeActive = routeActive;

  }

  ngOnInit() {
/*     this.AddForm = this.fb.group({
      fecha: ['', Validators.required],
      hora: null,
      grupo: ['', Validators.required],
      tipo: ['', Validators.required],
      comunidad: ['', Validators.required],
      provincia: ['', Validators.required],
      poblacion: ['', Validators.required],
      cp: ['', Validators.required],
    }); */
    this.filteredGroup = combineLatest(
      this.gruposService.getGruposBasico(),
      this.FiestaForm.controls.ControlGroup.valueChanges.pipe(startWith(''))
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
      this.FiestaForm.controls.ControlTipo.valueChanges.pipe(startWith(''))
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
      this.FiestaForm.controls.ControlComunidad.valueChanges.pipe(startWith(''))
    ).pipe(
      map(([grupo, filterString]) =>
        grupo.filter(
          (g) =>
            g.nombre.toLowerCase().indexOf(this.caseDown(filterString)) !== -1
        )
      )
    );
  }

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
      this.FiestaForm.controls.ControlProvincia.valueChanges.pipe(startWith(''))
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
      this.FiestaForm.controls.ControlPoblacion.valueChanges.pipe(startWith(''))
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
    this.mostrarcp = true;
    let resp = this.ubicacionService.getCP(option.id);
    this.filteredcp = combineLatest(
      resp,
      this.FiestaForm.controls.ControlCp.valueChanges.pipe(startWith(''))
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
    // this.fiestasService.addFiesta(this.AddForm.value)
    alert('Thanks!');
    console.log(this.FiestaForm.value);
    const values = this.FiestaForm.value;
    console.log(this.FiestaForm.controls.ControlFecha.value);
/*     console.log(this.FiestaForm.controls.ControlHora.value);
    console.log(this.FiestaForm.controls.ControlGroup.value.id);
    console.log(this.FiestaForm.controls.ControlTipo.value.id);
    console.log(this.FiestaForm.controls.ControlComunidad.value.id);
    console.log(this.FiestaForm.controls.ControlProvincia.value.id);
    console.log(this.FiestaForm.controls.ControlPoblacion.value.id);
    console.log(this.FiestaForm.controls.ControlCp.value.id); */

    const df = new Date(this.FiestaForm.controls.ControlFecha.value);
    console.log(df);
    df.setHours(this.FiestaForm.controls.ControlHora.value.substring(0, 2));
    df.setMinutes(this.FiestaForm.controls.ControlHora.value.substring(5, 3));

    console.log(df);
    this.fiestasService.addFiesta(
      df
      , this.FiestaForm.controls.ControlGroup.value.id
      , this.FiestaForm.controls.ControlTipo.value.id
      , this.FiestaForm.controls.ControlCp.value.id
      )
      .subscribe(
        data => {
          console.log(data);
          console.log('ok');
        },
        error => {
          console.log(error);

        });
    // this.fiestasService.addFiesta(new Date(year: this.AddForm.controls.date.value))
  }
}
