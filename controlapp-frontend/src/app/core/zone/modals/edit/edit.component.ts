import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZoneService } from '@core/zone/services/zone.service';
import { SnackbarService } from '@shared/material/services/snackbar.service';
import { Zone } from '@core/zone/interfaces/zone.interface';
import { ZoneComponent } from './../../zone.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ZoneComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Zone,
    private _zone: ZoneService,
    private _snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.data.name, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.value._id = this.data._id;
      this._zone.edit(this.form.value).subscribe(
        (message: string) => {
          this._snackbar.success(message);
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
