import { HttpQueries } from './../../assistance/shared/enums/http-queries.constant';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartInfoYearlyService } from '@shared/services/chart-info-yearly.service';
import { ChartInfoMonthlyService } from '@shared/services/chart-info-monthly.service';
import { AssistanceService } from './../../assistance/shared/services/assistance.service';
import { RangeOfDate } from 'src/app/shared/interfaces/range-date.interface';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
})
export class StatisticsComponent implements OnInit {
  labels: string[] = [];
  data: any[];

  private subsidiary_id: string;

  constructor(
    private route: ActivatedRoute,
    private _assistance: AssistanceService,
    private _chartInfoYearly: ChartInfoYearlyService,
    private _chartInfoMonthly: ChartInfoMonthlyService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.subsidiary_id = id;
    });
  }

  yearly(range: RangeOfDate) {
    this._assistance.getAllByRange(HttpQueries.SUBSIDIARY, range, this.subsidiary_id).subscribe((assistances) => {
      this.labels = this._chartInfoYearly.getLabels();
      this.data = this._chartInfoYearly.getData(assistances);
    });
  }

  monthly(range: RangeOfDate) {
    this._assistance.getAllByRange(HttpQueries.SUBSIDIARY, range, this.subsidiary_id).subscribe((assistances) => {
      this.labels = this._chartInfoMonthly.getLabels(range.startDate);
      this.data = this._chartInfoMonthly.getData(assistances);
    });
  }
}
