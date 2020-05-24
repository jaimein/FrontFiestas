import { Injectable } from '@angular/core';
import { comunidadesBasico, provinciaBasico, cpBasico, poblacionBasico } from '../models/ubicacion.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoBasico } from '../models/tipo.model';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  url: string;

  constructor(private http: HttpClient) { }

  getComunidades(): Observable<comunidadesBasico[]>{
    this.url = environment.url_api + 'Comunidad';
    return this.http.get<comunidadesBasico[]>(this.url);
  }

  getProvicias(idComunidad: number): Observable<provinciaBasico[]>{
    this.url = environment.url_api + 'Provincia/provinciasByComunidad';
    let params = new HttpParams();
    params = params.append('idComunidad', idComunidad.toString());
    return this.http.get<provinciaBasico[]>(this.url, {params});
  }

  getPoblaciones(idProvincia: number): Observable<poblacionBasico[]>{
    this.url = environment.url_api + 'Poblaciones/poblacionesByProvincia';
    let params = new HttpParams();
    params = params.append('idProvincia', idProvincia.toString());
    return this.http.get<poblacionBasico[]>(this.url, {params});
  }

  getCP(id: number): Observable<cpBasico[]>{
    this.url = environment.url_api + 'CodigoPostal/cpByPoblacion';
    let params = new HttpParams();
    params = params.append('idPoblacion', id.toString());
    return this.http.get<cpBasico[]>(this.url, {params});
  }

/*

    let params = new HttpParams();
    params = params.append('id', num.toString());

    return this.http.get<FiestaNombres>(this.url, {params});
*/


}
