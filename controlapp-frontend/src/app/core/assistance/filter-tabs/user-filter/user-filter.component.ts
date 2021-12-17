import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFilters } from '../../shared/enums/user-filter.enum';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
})
export class UserFilterComponent implements OnInit {
  @Output() onSelected = new EventEmitter();
  selected: UserFilters;
  form: FormGroup;
  userFilters = Object.values(UserFilters);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      value: ['', [Validators.required]],
    });
  }

  onSelectionUserFilterChange({ value }) {
    this.selected = value;
    this.selected === UserFilters.EMAIL
      ? this.form.get('value').setValidators([Validators.email, Validators.required])
      : this.form.get('value').setValidators([Validators.pattern('([0-9]){7,8}-([0-9Kk]){1}'), Validators.required]);
    this.form.get('value').reset();
  }

  emitRange(range) {
    if (this.form.valid) {
      const value =
        this.selected === UserFilters.EMAIL ? 'email/' + this.form.value.value : 'rut/' + this.form.value.value;
      this.onSelected.emit({ filter: this.selected, value, range });
    }
  }
}
