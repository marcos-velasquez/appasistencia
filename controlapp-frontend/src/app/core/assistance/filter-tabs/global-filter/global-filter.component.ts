import { Component, EventEmitter, Output } from '@angular/core';
import { RangeOfDate } from '@shared/interfaces/range-date.interface';

@Component({
  selector: 'app-global-filter',
  templateUrl: './global-filter.component.html',
})
export class GlobalFilterComponent {
  @Output() onSelected = new EventEmitter();

  constructor() {}

  emitRange(range: RangeOfDate) {
    this.onSelected.emit({ range });
  }
}
