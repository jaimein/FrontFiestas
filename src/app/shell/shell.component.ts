import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationService, InfoUser } from 'src/app/app-auth/authentication.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
})
export class ShellComponent implements OnInit {
  iu: InfoUser;
  public nombreApp = environment.nombreApp;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  login = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: AuthenticationService,
    private snackbarService: SnackbarService
  ) {
    this.iu = this.auth.InfoUser;
    this.iu.nombre = 'invitado';
    this.iu.email = '';
    this.iu.role = 0;
    this.iu.nameid = 0;
  }

  ngOnInit(): void {

    this.auth.currentUser.subscribe((arg) => {
      if (arg) {
        this.iu = this.auth.InfoUser;
        this.login = true;
      } else {
        this.iu.nombre = 'invitado';
        this.iu.email = '';
        this.iu.role = 0;
        this.iu.nameid = 0;
        this.login = false;
      }
      console.log(arg);
    });

  }

  logout() {
    this.auth.logout();
  }
}
