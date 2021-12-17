import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubsidiaryService } from '@core/subsidiary/shared/services/subsidiary.service';
import { SubsidiaryComponent } from '@core/subsidiary/subsidiary.component';
import { Zone } from '@core/zone/interfaces/zone.interface';
import { SnackbarService } from '@shared/material/services/snackbar.service';
import { ZoneService } from '@core/zone/services/zone.service';
import { Subsidiary } from '../../shared/interfaces/subsidiary.interface';
import { Place } from '../../shared/interfaces/place.interface';
import { GoogleMapsComponent } from '../google-maps/google-maps.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  form: FormGroup;
  zones: Zone[];
  constructor(
    public dialogRef: MatDialogRef<SubsidiaryComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Subsidiary,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _zone: ZoneService,
    private _subsidiary: SubsidiaryService,
    private _snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this._zone.getAll().subscribe((zones) => (this.zones = zones));
    this.form = this.fb.group({
      name: [this.data.name, [Validators.required]],
      coordinates: [this.data.coordinates, [Validators.required]],
      address: [this.data.address, [Validators.required]],
      zone: [this.data.zone?._id, [Validators.required]],
      number: [this.data.number, [Validators.required, Validators.pattern(/[0-9]+/)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.value['_id'] = this.data._id;
      this._subsidiary.edit(this.form.value).subscribe(
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

  googleMapsDialog() {
    const place: Place = {
      name: this.data.name,
      longitud: this.data.coordinates.latitude,
      latitud: this.data.coordinates.longitude,
      address: this.data.address,
    };
    const ref = this.dialog.open(GoogleMapsComponent, { width: '100vw', height: '90vh', data: place });
    ref.afterClosed().subscribe((place: Place) => {
      if (place) {
        this.form.patchValue({
          local_name: place.name,
          coordinates: { latitude: place.latitud, longitude: place.longitud },
          address: place.address,
        });
      }
    });
  }
}
