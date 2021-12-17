import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-filter-tabs',
  templateUrl: './filter-tabs.component.html',
  styleUrls: ['./filter-tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FilterTabsComponent implements OnInit {
  @Output() onFilterBySubsidiary = new EventEmitter();
  @Output() onFilterByUser = new EventEmitter();
  @Output() onFilterGlobal = new EventEmitter();
  @Output() onFilterByZone = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onSelectedFilterBySubsidiary({ subsidiary_id, range }) {
    this.onFilterBySubsidiary.emit({ subsidiary_id, range });
  }
  onSelectedFilterByUser({ filter, value, range }) {
    this.onFilterByUser.emit({ filter, value, range });
  }
  onSelectedFilterByGlobal({ range }) {
    this.onFilterGlobal.emit({ range });
  }
  onSelectedFilterByZone({ zone_id, range }) {
    this.onFilterByZone.emit({ zone_id, range });
  }
}
