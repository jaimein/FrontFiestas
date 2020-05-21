import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FiestaNombres } from '../models/fiestas.model';

@Injectable({
  providedIn: 'root'
})
export class FiestasService {

  private url: string;
  private fi: FiestaNombres;

  constructor(private http: HttpClient) { }

    public getFiesta(): Observable<FiestaNombres>{
    this.url = environment.url_api + 'Fiesta/obtenerFiestasSimple';
    // console.log(this.url);
    // let datos = this.http.get<FiestaNombres>(this.url);
    // console.log(datos);
    return this.http.get<FiestaNombres>(this.url);
  }

  getFiestasNombres(): Observable<FiestaNombres[]>{
    this.url = environment.url_api + 'Fiesta/obtenerFiestasSimple';
    // console.log(this.url);
    return this.http.get<FiestaNombres[]>(this.url);
  }

  getFiestaNombre(num: number){
    this.url = environment.url_api + 'Fiesta/obtenerFiestaSimple';
    console.log(this.url);
    let params = new HttpParams();
    params = params.append('id', num.toString());

    return this.http.get<FiestaNombres>(this.url, {params});
  }

  getFiestasNombresback(): Observable<FiestaNombres[]>{
    this.url = environment.url_api + 'Fiesta/obtenerFiestasSimple';
    console.log(this.url);
    return this.http.get<FiestaNombres[]>(this.url);
  }
}
