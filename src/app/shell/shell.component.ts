import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/app-auth/authentication.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
})
export class ShellComponent implements OnInit {
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
    private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.auth.currentUser.subscribe(arg => {if (arg) {
      this.login = true;
    } else {
      this.login = false;
    }});
  }

  logout(){
    this.auth.logout();
  }
}
