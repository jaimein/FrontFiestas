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
    let params = new HttpParams();
    params = params.append('id', num.toString());
    return this.http.get<FiestaNombres>(this.url, {params});
  }

  addFiesta(fecha: Date, idGrupo: number, idTipo: number, idCP: number){
    this.url = environment.url_api + 'Fiesta/agregar';
    //console.log(this.url);
    let params = new HttpParams();
    //console.log(fecha.toISOString());
    const data = {
      'fecha': fecha.toString().substring(0,24)
      ,'id_grupo': idGrupo.toString()
      ,'id_tipo': idTipo.toString()
      ,'id_codigo_postal': idCP.toString()};
/*     params = params.append('fecha', fecha.toString());
    params = params.append('id_grupo', idGrupo.toString());
    params = params.append('id_tipo', idTipo.toString());
    params = params.append('id_codigo_postal', idCP.toString()); */
    console.log(data);
    return this.http.post<any>(this.url, data);
  }
}
