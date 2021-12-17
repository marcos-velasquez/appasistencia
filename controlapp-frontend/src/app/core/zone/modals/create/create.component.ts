import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZoneService } from '@core/zone/services/zone.service';
import { SnackbarService } from '@shared/material/services/snackbar.service';
import { ZoneComponent } from './../../zone.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ZoneComponent>,
    private _zone: ZoneService,
    private _snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this._zone.create(this.form.value).subscribe(
        () => {
          this._snackbar.success('Zona creada');
          this.dialogRef.close(true);
        },
        (message: string) => {
          this._snackbar.error(message);
        }
      );
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
