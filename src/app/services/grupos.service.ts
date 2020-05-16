import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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


}
