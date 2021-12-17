import { Assistance } from '@core/assistance/shared/interfaces/assistance';
//@ts-ignore
import { ChartDataSets } from 'chart.js';

export interface ChartInfo {
  getLabels(date?: string | Date): string[];
  getData(assistances: Assistance[]): ChartDataSets[];
}

export interface ChartInfoData {
  data: number[];
  label: string;
}
