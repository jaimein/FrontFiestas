import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoBasico,TipoTotal } from '../models/tipo.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TiposService {


  private url: string;

  constructor(private http: HttpClient) { }

  getTiposBasico(): Observable<TipoBasico[]>{
    this.url = environment.url_api + 'Tipos/obtenerTiposBasico';
    return this.http.get<TipoBasico[]>(this.url);
  }

  getTipo(id: number):  Observable<TipoTotal>{
    this.url = environment.url_api + 'Tipos/id?id='+`${id}`;
    return this.http.get<TipoTotal>(this.url);
  }

  addTipo(nom: string){
    this.url = environment.url_api + 'Tipos/agregar';
    const params = new HttpParams();
    const data = {
      nombre: nom};
    return this.http.post<any>(this.url, data);
  }
}
