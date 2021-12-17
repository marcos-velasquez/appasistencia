import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubsidiaryComponent } from '@core/subsidiary/subsidiary.component';
import { ZoneService } from '@core/zone/services/zone.service';
import { Zone } from '@core/zone/interfaces/zone.interface';
import { SubsidiaryService } from '@core/subsidiary/shared/services/subsidiary.service';
import { SnackbarService } from '@shared/material/services/snackbar.service';
import { Place } from '@core/subsidiary/shared/interfaces/place.interface';
import { GoogleMapsComponent } from '@core/subsidiary/modals/google-maps/google-maps.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  zones: Zone[];
  constructor(
    private dialogRef: MatDialogRef<SubsidiaryComponent>,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _zone: ZoneService,
    private _subsidiary: SubsidiaryService,
    private _snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this._zone.getAll().subscribe((zones) => (this.zones = zones));
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      coordinates: ['', [Validators.required]],
      address: ['', [Validators.required]],
      zone: ['', [Validators.required]],
      number: ['', [Validators.required, Validators.pattern(/[0-9]+/)]],
    });
  }

  googleMapsDialog() {
    const place: Place = { name: null, longitud: null, latitud: null, address: null };
    const ref = this.dialog.open(GoogleMapsComponent, { width: '100vw', height: '90vh', data: place });
    ref.afterClosed().subscribe((place: Place) => {
      if (place) {
        this.form.patchValue({
          name: place.name,
          coordinates: { latitude: place.latitud, longitude: place.longitud },
          address: place.address,
        });
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this._subsidiary.create(this.form.value).subscribe(
        () => {
          this._snackbar.success('Sucursal creada');
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
