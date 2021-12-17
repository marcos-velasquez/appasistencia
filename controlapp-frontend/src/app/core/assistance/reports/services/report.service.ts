import { HeaderAssistance } from '../constants/header-assistance.constant';
import { Injectable } from '@angular/core';
import { ExcelService } from './excel.service';
import { WorksheetModel } from '../models/woorkheet.model';
import { Report } from '../interfaces/report.interface';
import { AssistanceParse } from './../../shared/interfaces/assistance';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ReportService extends ExcelService implements Report<AssistanceParse[]> {
  constructor(private datePipe: DatePipe) {
    super('Plantilla de asistencias');
  }

  generate(assistances: AssistanceParse[]) {
    super.generateOnePage(new WorksheetModel<any>(this.name, HeaderAssistance, this.parsear(assistances)));
  }

  private parsear(assistances: AssistanceParse[]) {
    return assistances.map((assistance) => ({
      name: assistance.name,
      rut: assistance.rut,
      officeStart: assistance.register[0]?.subsidiary.name + ' ' + this.getDate(assistance.register[0]?.date),
      lunchStart: assistance.register[1]?.subsidiary.name + ' ' + this.getDate(assistance.register[1]?.date),
      lunchEnd: assistance.register[2]?.subsidiary.name + ' ' + this.getDate(assistance.register[2]?.date),
      officeEnd: assistance.register[3]?.subsidiary.name + ' ' + this.getDate(assistance.register[3]?.date),
    }));
  }

  private getDate(date: Date) {
    return date ? this.datePipe.transform(date, 'short') : '';
  }
}
