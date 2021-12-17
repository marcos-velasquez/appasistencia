import { Component, OnInit } from '@angular/core';
import { HttpQueries } from '@core/assistance/shared/enums/http-queries.constant';
import { AssistanceService } from '@core/assistance/shared/services/assistance.service';
import { ChartInfoData } from '@shared/interfaces/chart-info.interface';
import { ChartInfoMonthlyService } from '@shared/services/chart-info-monthly.service';
import { ChartInfoYearlyService } from '@shared/services/chart-info-yearly.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
})
export class StatisticsComponent implements OnInit {
  labels: string[] = [];
  data: ChartInfoData[];

  constructor(
    private _assistance: AssistanceService,
    private _chartInfoYearly: ChartInfoYearlyService,
    private _chartInfoMonthly: ChartInfoMonthlyService
  ) {}

  ngOnInit(): void {}
  yearly(range) {
    this._assistance.getAllByRange(HttpQueries.ALL, range).subscribe((assistances) => {
      this.labels = this._chartInfoYearly.getLabels();
      this.data = this._chartInfoYearly.getData(assistances);
    });
  }

  monthly(range) {
    this._assistance.getAllByRange(HttpQueries.ALL, range).subscribe((assistances) => {
      this.labels = this._chartInfoMonthly.getLabels(range.startDate);
      this.data = this._chartInfoMonthly.getData(assistances);
    });
  }
}
