import { Component, Input } from '@angular/core';
import { Assistance } from '../shared/interfaces/assistance';
import { dataDisplay } from '../shared/constants/data-display.constant';
import { ReportService } from '../reports/services/report.service';

@Component({
  selector: 'app-table-assistance',
  templateUrl: './table.component.html',
})
export class TableComponent {
  _assistances: any;
  dataDisplay = dataDisplay;

  @Input() set assistances(assistances) {
    this._assistances = this.parsear(assistances);
  }

  constructor(private _report: ReportService) {}

  get hasAssistances() {
    return this._assistances.length > 0;
  }

  generateReport() {
    this._report.generate(this._assistances);
  }

  private parsear = (assistances: Assistance[]) => {
    return assistances.map((assistance) => ({
      name: assistance.user.first_name + ' ' + assistance.user.last_name,
      rut: assistance.user.rut,
      register: assistance.register,
    }));
  };
}
