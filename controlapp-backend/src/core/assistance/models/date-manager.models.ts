import { DateTime } from 'luxon';

export class DateManager {
  constructor() {}

  static fromDate(date: Date) {
    return DateTime.fromJSDate(date, { zone: 'America/Santiago' });
  }

  static fromISO(date: string) {
    return DateTime.fromISO(date, { zone: 'America/Santiago' });
  }

  static now() {
    return DateTime.now().setZone('America/Santiago');
  }
}
