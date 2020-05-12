import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Fiestas', cols: 1, rows: 1, img: 'https://images.unsplash.com/photo-1546148217-293f105f5e6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1417&q=80'},
          { title: 'Poblaciones', cols: 1, rows: 1 },
          { title: 'Grupos', cols: 1, rows: 1 },
          { title: 'Tipos', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Fiestas', cols: 2, rows: 1, img: 'https://images.unsplash.com/photo-1546148217-293f105f5e6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1417&q=80'},
        { title: 'Poblaciones', cols: 1, rows: 1 },
        { title: 'Grupos', cols: 1, rows: 2 },
        { title: 'Tipos', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
