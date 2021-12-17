import { DatePipe } from '@angular/common';
import { ChartInfo, ChartInfoData } from '../interfaces/chart-info.interface';
import { Injectable } from '@angular/core';
import { Months } from '@core/subsidiary/shared/enums/months.enum';
import { Assistance } from '@core/assistance/shared/interfaces/assistance';

@Injectable({
  providedIn: 'root',
})
export class ChartInfoYearlyService implements ChartInfo {
  constructor(private datePipe: DatePipe) {}

  getLabels() {
    return Object.values(Months);
  }

  getData(assistances: Assistance[], label = ''): ChartInfoData[] {
    const dates = this.getDates(assistances);
    const monthsArray = this.getMonths(dates);
    const data = this.getMonthMatchesInArray(monthsArray);
    return [{ data, label }];
  }

  private getDates(assistances: Assistance[]) {
    return assistances.map((assistance) => this.datePipe.transform(assistance.createdAt));
  }

  private getMonths(dates: (string | Date)[]) {
    return dates.map((date) => new Date(date).getUTCMonth());
  }

  private getMonthMatchesInArray(months: number[]) {
    let monthMatches: number[] = [];
    for (let index = 0; index < Object.values(Months).length; index++) {
      const matches = months.filter((month) => month === index).length;
      monthMatches[index] = matches;
    }
    return monthMatches;
  }
}
