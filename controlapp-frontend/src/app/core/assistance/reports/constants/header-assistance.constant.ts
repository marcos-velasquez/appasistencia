// @ts-ignore
import { Column } from 'exceljs/dist/exceljs.min.js';
import { style } from './styles.constant';

export const HeaderAssistance: Column[] = [
  { header: 'Nombre', key: 'name', width: 30, style },
  { header: 'Rut', key: 'rut', width: 40, style },
  { header: 'Entrada', key: 'officeStart', width: 70, style },
  { header: 'Inicio de almuerzo', key: 'lunchStart', width: 70, style },
  { header: 'Fin de almuerzo', key: 'lunchEnd', width: 70, style },
  { header: 'Salida', key: 'officeEnd', width: 70, style },
];
