import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { GrupoBasico } from '../models/grupo.model';
import { GruposService } from '../services/grupos.service';
import { TiposService } from '../services/tipos.service';
import { AuthenticationService } from '../security/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { map, startWith, subscribeOn } from 'rxjs/operators';
import { TipoBasico } from '../models/tipo.model';
import { UbicacionService } from '../services/ubicacion.service';
import { comunidadesBasico, provinciaBasico, poblacionBasico, cpBasico } from '../models/ubicacion.model';
import { FiestasService } from '../services/fiestas.service';
import { Fiestatotal } from '../models/fiestas.model';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  AddForm: FormGroup;
  tipo = 'fiestas';
  id: number;
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
    private fiestasService: FiestasService,
    private snackbarService: SnackbarService
  ) {
    this.routeActive = routeActive;
    this.routeActive.params.subscribe((params) => {
      this.tipo = params.tipo;
      this.id = params.id;
      console.log(this.tipo + this.id);
      this.cargarDatos(this.tipo);
    });  }

  ngOnInit() {
    this.FiestaForm = this.fb.group({
      ControlFecha: ['', Validators.required],
      ControlHora: null,
      ControlGroup: ['', Validators.required],
      ControlTipo: ['', Validators.required],
      ControlComunidad: ['', Validators.required],
      ControlProvincia: ['', Validators.required],
      ControlPoblacion: ['', Validators.required],
      ControlCp: ['', Validators.required],
    });

  }

  cargarDatos(tipoCarga: string){
    switch (tipoCarga) {
      case 'fiestas':
        if (this.id) {
          this.cargaFiesta(this.id);
        } else {
          this.cargarDatosFiesta();
        }
        break;
      case 'grupos':

        break;
      case 'tipos':

        break;
    }

  }

  cargaFiesta(num: number){

    this.cargarDatosFiesta();
    let fiesta: Fiestatotal;
    const cargafinalizada=false;
/*     this.fiestasService.getFiesta(this.id).pipe().subscribe(
      (x) => {fiesta = x;
              this.cargarForm(x);
              console.log('asdf');
      }); */
  }

/*   cargarForm(f: Fiestatotal) :void{
    console.log('cargadata');
    console.log(f);
    this.FiestaForm.controls.ControlFecha.setValue(f.fecha);
    const hora = f.fecha.toString().substring(14,21);
    this.FiestaForm.controls.ControlHora.setValue(hora);
    this.gruposService.getGrupo(f.idGrupo).pipe().subscribe((x)=>{
      this.FiestaForm.controls.ControlGroup.setValue(x.descripcion);
      this.FiestaForm.controls.ControlGroup.updateValueAndValidity();

    });
    this.tiposService.getTipo(f.idTipo).pipe().subscribe((x)=>{
      this.FiestaForm.controls.ControlTipo.setValue(x.descripcion);
    });

    this.ubicacionService.getCP(f.idCodigoPostal).pipe().subscribe((x)=>{
      this.FiestaForm.controls.ControlCp.setValue(x.calle);
    });
  } */
  cargarDatosFiesta(){
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


  onSubmit() {
    if (this.FiestaForm.invalid) {
      return;
    }
    alert('Thanks!');
    const values = this.FiestaForm.value;


    const df = new Date(this.FiestaForm.controls.ControlFecha.value);
    df.setHours(this.FiestaForm.controls.ControlHora.value.substring(0, 2));
    df.setMinutes(this.FiestaForm.controls.ControlHora.value.substring(5, 3));

    this.fiestasService.addFiesta(
      df
      , this.FiestaForm.controls.ControlGroup.value.id
      , this.FiestaForm.controls.ControlTipo.value.id
      , this.FiestaForm.controls.ControlCp.value.id
      )
      .subscribe(
        data => {
          this.snackbarService.success('Fiesta añadida');
        },
        error => {
          this.snackbarService.error('Error:' + error);
        });
  }
}
