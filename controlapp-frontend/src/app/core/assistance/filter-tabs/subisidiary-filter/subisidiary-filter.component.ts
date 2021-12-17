import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subsidiary } from '@core/subsidiary/shared/interfaces/subsidiary.interface';
import { SubsidiaryService } from '@core/subsidiary/shared/services/subsidiary.service';
import { RangeOfDate } from '@shared/interfaces/range-date.interface';

@Component({
  selector: 'app-subisidiary-filter',
  templateUrl: './subisidiary-filter.component.html',
})
export class SubisidiaryFilterComponent implements OnInit {
  @Output() onSelected = new EventEmitter();
  subsidiaries: Array<Subsidiary> = [];
  selected: string;

  constructor(private _subsidiary: SubsidiaryService) {}

  ngOnInit(): void {
    this.getSubsidiaries();
  }

  private getSubsidiaries() {
    this._subsidiary.getAllEnabled().subscribe((subsidiaries) => (this.subsidiaries = subsidiaries));
  }

  emitRange(range: RangeOfDate) {
    this.onSelected.emit({ subsidiary_id: this.selected, range });
  }
}
