import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoBasico } from '../models/tipo.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TiposService {

  private url: string;

  constructor(private http: HttpClient) { }

  getTiposBasico(): Observable<TipoBasico[]>{
    this.url = environment.url_api + 'Grupo/obtenerGruposBasico';
    return this.http.get<TipoBasico[]>(this.url);
  }
}
