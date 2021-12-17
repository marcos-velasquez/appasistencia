import { WorksheetModel } from './../models/woorkheet.model';
// @ts-ignore
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
// @ts-ignore
import { Worksheet } from 'exceljs';

export abstract class ExcelService {
  private type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  private workbook = new Workbook();
  private worksheet: Worksheet;

  constructor(protected name: string) {}

  private build(sheet: WorksheetModel<any>) {
    this.worksheet = this.workbook.addWorksheet(sheet.name);
    this.worksheet.columns = sheet.header;
    sheet.data.forEach((data) => this.worksheet.addRow(data));
  }

  private resetBook() {
    this.workbook = new Workbook();
  }

  async generateOnePage(sheet: WorksheetModel<any>) {
    this.build(sheet);
    this.setHeaderStyle();
    await this.save();
    this.resetBook();
  }

  async generateManyPage(sheets: WorksheetModel<any>[]) {
    sheets.forEach((sheet) => this.build(sheet));
    await this.save();
    this.resetBook();
  }

  private setHeaderStyle() {
    this.worksheet.getRow(1).height = 42;
    this.worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell: any) => {
      const currentCell = this.worksheet.getCell(cell.address);
      currentCell.fill = {
        type: 'pattern',
        pattern: 'darkTrellis',
        fgColor: { argb: 'FFFF9D12' },
        bgColor: { argb: 'FFF9D12' },
      };
    });
  }

  private async save() {
    const data = await this.workbook.xlsx.writeBuffer();
    const blob = new Blob([data], { type: this.type });
    saveAs(blob, this.name + '.xlsx');
  }
}
