import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Assistance } from '@core/assistance/shared/interfaces/assistance';
import { NumberOfDaysOfTheMonth } from '@core/subsidiary/shared/enums/months.enum';
import { ChartInfo, ChartInfoData } from '../interfaces/chart-info.interface';

@Injectable({
  providedIn: 'root',
})
export class ChartInfoMonthlyService implements ChartInfo {
  private numbersOfDay = '0';

  constructor(private datePipe: DatePipe) {}

  getLabels(date: string | Date) {
    const month = new Date(date).getUTCMonth();
    this.numbersOfDay = Object.values(NumberOfDaysOfTheMonth)[month];
    return new Array(Number(this.numbersOfDay)).fill(0).map((_, index) => String(index + 1));
  }

  getData(assistances: Assistance[], label = ''): ChartInfoData[] {
    const dates = this.getDates(assistances);
    const daysArray = this.getDays(dates);
    const data = this.getDaysMatchesInArray(daysArray);
    return [{ data, label }];
  }

  private getDates(assistances: Assistance[]) {
    return assistances.map((assistance) => this.datePipe.transform(assistance.createdAt));
  }

  private getDays(dates: (string | Date)[]) {
    return dates.map((date) => new Date(date).getUTCDate());
  }

  private getDaysMatchesInArray(days: number[]) {
    let daysMatches: number[] = [];
    for (let index = 1; index <= Number(this.numbersOfDay); index++) {
      const matches = days.filter((day) => day === index).length;
      daysMatches[index - 1] = matches;
    }
    return daysMatches;
  }
}
