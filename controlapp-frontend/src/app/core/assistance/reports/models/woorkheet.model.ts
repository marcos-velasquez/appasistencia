//@ts-ignore
import { Column } from "exceljs/dist/exceljs.min.js";

export class WorksheetModel<T> {
  constructor(public name: string, public header: Column[], public data: T) {}
}
