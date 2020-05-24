import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GrupoBasico } from '../models/grupo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  private url: string;

  constructor(private http: HttpClient) { }

  getGruposBasico(): Observable<GrupoBasico[]>{
    this.url = environment.url_api + 'Grupo/obtenerGruposBasico';
    return this.http.get<GrupoBasico[]>(this.url);
  }

  getGrupo(id: number): Observable<GrupoBasico>{
    this.url = environment.url_api + 'Grupo/id?id=' + `${id}`;
    return this.http.get<GrupoBasico>(this.url);
  }

  addGrupo(nom: string){
    this.url = environment.url_api + 'Grupo/agregar';
    const params = new HttpParams();
    const data = {
      nombre: nom};
    return this.http.post<any>(this.url, data);
  }
}
