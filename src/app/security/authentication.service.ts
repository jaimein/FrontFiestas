import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';
import { User } from '../models/user.model';
import { sha256, sha224 } from 'js-sha256';

export interface ApplicationUser {
  token: string;
  username: string;
  expiresIn: Date;
}

export interface InfoUser{
  nombre: string;
  email: string;
  role: number;
  nameid: number;
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<ApplicationUser>;
  public currentUser: Observable<ApplicationUser>;

  constructor(private readonly http: HttpClient, ) {
    this.currentUserSubject = new BehaviorSubject<ApplicationUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): ApplicationUser {
    return this.currentUserSubject.value;
  }

  public get InfoUser(): InfoUser {
    if (this.currentUserValue){
    return jwt_decode(this.currentUserValue.token);
    } else {
      return {nombre: 'invitado', email: '', role: 0, nameid: 0};
    }
  }



  login(nombre: string, password: string) {

    password = sha256(password);
    return this.http.post<any>(environment.url_api + 'Auth', { nombre, password }, )
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  createUser(nombre: string, password: string, email: string){
    return this.http.post<any>(environment.url_api + 'Auth/crear', { nombre, password, email }, )
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  obtenerUsers(): Observable<User[]>{
    return this.http.get<User[]>(environment.url_api + 'Usuarios');
  }

}
