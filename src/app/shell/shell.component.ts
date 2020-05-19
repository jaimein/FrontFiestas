import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/app-auth/authentication.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
})
export class ShellComponent {
  public nombreApp = environment.nombreApp;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
    login = false;


  constructor(private breakpointObserver: BreakpointObserver,    private auth: AuthenticationService   ) {}

  ngOnInit(): void {
    console.log('init');
    this.auth.currentUser.subscribe(arg => {if (arg) {
      console.log('login');
      this.login = true;
    } else {
      this.login = false;
      console.log('nooooo');
    }});
  }

  logout(){
    this.auth.logout();
  }
}
