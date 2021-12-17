import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class FormatDateService {
  constructor(private locale: string) {}

  getHoursOfDate(date: Date | string) {
    return formatDate(date, 'mediumTime', this.locale);
  }

  getDateToSpanish(date: Date | string) {
    return formatDate(date, 'fullDate', this.locale);
  }
}
