import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Color, Label } from 'ng2-charts';
import { TimeService } from '@shared/services/time.service';
//@ts-ignore
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-chart-line',
  templateUrl: './line.component.html',
  styles: ['.mat-tab-body-content{display:flex; justify-content:center;width:100%;}'],
  encapsulation: ViewEncapsulation.None,
})
export class LineComponent implements OnInit {
  @Output() onYearly = new EventEmitter();
  @Output() onMonthly = new EventEmitter();
  @Input() lineChartLabels: Label[];
  private _lineChartData: ChartDataSets[];
  @Input() set lineChartData(lineChartData: ChartDataSets[]) {
    this._lineChartData = lineChartData;
    if (this._lineChartData) {
      const data = <Array<number>>this._lineChartData[0].data;
      this.amountAssistances = data.reduce((acc, val) => acc + Number(val), 0);
    }
  }
  get lineChartData() {
    return this._lineChartData;
  }
  amountOfYear = new Array(20);
  amountAssistances = 0;
  lineChartColors: Color[] = [
    {
      borderColor: '#0b0a54',
      backgroundColor: '#c6a246',
    },
  ];
  lineChartLegend = true;
  lineChartType = 'line';

  constructor(private _time: TimeService) {}

  ngOnInit(): void {}

  yearly({ value }) {
    this.onYearly.emit(this._time.getRangeOfYear(value));
  }

  monthly({ target }: { target: HTMLInputElement }) {
    this.onMonthly.emit(this._time.getRangeOfMonth(target.value));
  }
}
