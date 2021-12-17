import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Period } from '@shared/enums/period.enum';
import { RangeOfDate } from '@shared/interfaces/range-date.interface';
import { TimeService } from '@shared/services/time.service';

@Component({
  selector: 'app-select-period',
  templateUrl: './select-period.component.html',
})
export class SelectPeriodComponent implements OnInit {
  @Output() onRange = new EventEmitter();
  periods = Object.values(Period);
  isCustomPeriod = false;
  formCustomPeriod: FormGroup;

  constructor(private fb: FormBuilder, private _time: TimeService) {}

  ngOnInit(): void {
    this.formCustomPeriod = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
    });
  }

  onSelectionPeriodChange({ value }) {
    value === Period.CUSTOM ? (this.isCustomPeriod = true) : this.emitByPeriod(value);
  }

  onSubmit() {
    if (this.formCustomPeriod.valid) {
      const { value } = this.formCustomPeriod;
      const range: RangeOfDate = {
        startDate: value.from,
        endDate: value.to,
      };

      this.emit(range);
    }
  }

  private emitByPeriod(period: Period) {
    this.isCustomPeriod = false;
    const range = this._time.getRangeByCurrentDateAndPeriod(period);
    this.emit(range);
  }

  emit({ startDate, endDate }) {
    this.onRange.emit({ startDate, endDate });
  }
}
