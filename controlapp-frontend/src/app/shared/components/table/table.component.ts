import { Component, ContentChildren, Input, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatColumnDef, MatHeaderRowDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { DataDisplay } from './interfaces/data-display.interface';
import { ResponsiveBreakpointService } from './services/responsive-breakpoint.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent<T> {
  dataSource: MatTableDataSource<T>;

  @Input() dataDisplay: DataDisplay;
  @Input() hasHeaderOptions = false;
  @Input() hasSearchInput = true;

  _data: T[] = [];
  @Input() set data(data: T[]) {
    if (data) {
      this._data = data;
      this.setDataSource();
    }
  }

  @ViewChild(MatTable, { static: true }) table: MatTable<T>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;
  @ContentChildren(MatHeaderRowDef) headerDefs: QueryList<MatHeaderRowDef>;

  constructor(private _responsive: ResponsiveBreakpointService) {}

  ngAfterContentInit(): void {
    this.headerDefs.forEach((headerDef) => this.table.addHeaderRowDef(headerDef));
    this.columnDefs.forEach((columnDef) => this.table.addColumnDef(columnDef));
    this._responsive.dataDisplay(this.dataDisplay).listen(this.dataDisplay);
    this.setDataSource();
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource(this._data);
    this.dataSource.paginator = this.paginator;
  }

  search(event: Event) {
    this.dataSource.filter = event.target['value'];
    this.dataSource.paginator.firstPage();
  }
}
