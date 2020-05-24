import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { GruposService } from 'src/app/services/grupos.service';
import { TiposService } from 'src/app/services/tipos.service';


@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css']
})
export class SimpleComponent implements OnInit {
  routeActive: ActivatedRoute;
  Form: FormGroup;
  showSpinner = false;
  tipo: string;
  error = '';
  returnUrl: string;

var:any;
  constructor(
    private formBuilder: FormBuilder,
    routeActive: ActivatedRoute,
    private fb: FormBuilder,
    private gruposService: GruposService,
    private tiposService: TiposService,
    private router: Router,
    private route: ActivatedRoute,

  ) {
    this.routeActive = routeActive;
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.routeActive.params.subscribe((params) => {
      console.log(params);
      this.tipo = params.tipo;
    });  }

  ngOnInit(): void {
    this.Form = this.formBuilder.group({
      nombre: ['', Validators.required],
    });
  }

  onSubmit(){
    if (this.Form.invalid) {
      return;
    }
    this.showSpinner = true;
    if (this.tipo === 'grupos') {
      this.var = this.gruposService.addGrupo(this.Form.controls.nombre.value);
    } else {
      this.var = this.tiposService.addTipo(this.Form.controls.nombre.value);
    }

    this.var.subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.error = error;
        this.showSpinner = false;
      });
  }
}
