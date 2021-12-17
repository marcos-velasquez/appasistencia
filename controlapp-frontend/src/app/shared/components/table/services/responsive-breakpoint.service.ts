import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DataDisplay } from '../interfaces/data-display.interface';

@Injectable()
export class ResponsiveBreakpointService {
  private queries = ['(max-width: 480px)', '(max-width: 680px)', '(max-width: 768px)', '(max-width: 1024px)'];
  private data: DataDisplay;
  constructor(public breakpointObserver: BreakpointObserver) {}

  dataDisplay(data: DataDisplay) {
    this.data = data;
    return this;
  }

  listen(columns: DataDisplay) {
    this.breakpointObserver.observe(this.queries).subscribe((state) => {
      let responsives = [columns[480], columns[680], columns[768], columns[1024]];

      for (let i = 0; i < this.queries.length; i++) {
        if (state.breakpoints[this.queries[i]]) {
          this.data.active.splice(0, this.data.active.length);
          responsives[i].forEach((responsive) => this.data.active.push(responsive));
        }
      }
    });
  }
}
