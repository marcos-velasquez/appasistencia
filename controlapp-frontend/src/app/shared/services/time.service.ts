import { Injectable } from '@angular/core';
import { RangeOfDate } from '../interfaces/range-date.interface';
import { Period } from '../enums/period.enum';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  private ranges: Map<Period, RangeOfDate> = new Map();

  constructor() {
    this.ranges.set(Period.ALL, this.allRange);
    this.ranges.set(Period.TODAY, this.todayRange);
    this.ranges.set(Period.MONTHLY, this.monthlyRange);
    this.ranges.set(Period.WEEKLY, this.weeklyRange);
    this.ranges.set(Period.BIWEEKLY, this.biweeklyRange);
    this.ranges.set(Period.YEARLY, this.yearlyRange);
  }

  getRangeOfMonth(month: string): RangeOfDate {
    let [year, currentMonth] = month.split('-');
    const startDate = new Date(Number(year), Number(currentMonth) - 1, 1);
    const endDate = new Date(Number(year), Number(currentMonth), 1);
    return { startDate, endDate };
  }

  getRangeOfYear(year: number): RangeOfDate {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    return { startDate, endDate };
  }

  getRangeByCurrentDateAndPeriod(period: Period) {
    return this.ranges.get(period);
  }

  private get allRange() {
    return { startDate: null, endDate: null };
  }

  private get yearlyRange() {
    return this.operationDate(365);
  }

  private get todayRange() {
    return this.operationDate(0);
  }

  private get biweeklyRange() {
    return this.operationDate(15);
  }

  private get monthlyRange() {
    return this.operationDate(31);
  }

  private get weeklyRange() {
    return this.operationDate(7);
  }

  private operationDate(number: number): RangeOfDate {
    const date = new Date();
    const oldDate = date.getDate() - number;
    date.setDate(oldDate);
    return { startDate: date, endDate: new Date() };
  }
}
