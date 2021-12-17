import { Component, Input } from '@angular/core';
import { DataDisplay } from '../../interfaces/data-display.interface';

@Component({
  selector: 'app-toggle-label',
  templateUrl: './toggle-label.component.html',
})
export class ToggleLabelComponent {
  @Input() dataDisplay: DataDisplay;

  constructor() {}

  toggle(value: string) {
    const header = this.getHeader(value);
    this.dataDisplay.active.includes(header) ? this.removeHeader(header) : this.addHeader(header);
  }

  private getHeader(value: string) {
    const index = this.dataDisplay.labels.findIndex((label) => label === value);
    return this.dataDisplay.headers[index];
  }

  private removeHeader(header: string) {
    const index = this.dataDisplay.active.findIndex((active) => active === header);
    this.dataDisplay.active.splice(index, 1);
  }

  addHeader(header: string) {
    const active = [...this.dataDisplay.active, header];
    this.dataDisplay.active.splice(0, this.dataDisplay.active.length);
    for (let i = 0; i < this.dataDisplay.headers.length; i++) {
      const header = active.find((active) => active === this.dataDisplay.headers[i]);
      if (header) {
        this.dataDisplay.active.push(header);
      }
    }
  }
}
