import { Zone } from './../../../zone/interfaces/zone.interface';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RangeOfDate } from 'src/app/shared/interfaces/range-date.interface';
import { ZoneService } from '@core/zone/services/zone.service';

@Component({
  selector: 'app-zone-filter',
  templateUrl: './zone-filter.component.html',
})
export class ZoneFilterComponent implements OnInit {
  @Output() onSelected = new EventEmitter();
  zones: Array<Zone> = [];
  selected: string;

  constructor(private _zone: ZoneService) {}

  ngOnInit(): void {
    this.getZones();
  }

  private getZones() {
    this._zone.getAll().subscribe((zones) => (this.zones = zones));
  }

  emitRange(range: RangeOfDate) {
    this.onSelected.emit({ zone_id: this.selected, range });
  }
}
