import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SubsidiaryComponent } from '@core/subsidiary/subsidiary.component';
import { EditComponent } from './modals/edit/edit.component';
import { CreateComponent } from './modals/create/create.component';
import { Zone } from './interfaces/zone.interface';
import { ZoneService } from './services/zone.service';
import { dataDisplay } from './constants/data-display.constant';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
})
export class ZoneComponent {
  zones: Zone[];
  dataDisplay = dataDisplay;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<SubsidiaryComponent>,
    private _zone: ZoneService
  ) {}

  ngAfterViewInit() {
    this.setData();
  }

  setData = (hasNew = true) => {
    if (hasNew) {
      this._zone.getAll().subscribe((zones) => {
        this.zones = zones;
      });
    }
  };

  create(): void {
    this.dialog.open(CreateComponent).afterClosed().subscribe(this.setData);
  }

  edit(zone: Zone): void {
    this.dialog.open(EditComponent, { data: zone }).afterClosed().subscribe(this.setData);
  }

  remove(zone: Zone): void {
    Swal.fire({
      title: '¿Estás segur@?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this._zone.remove(zone).subscribe(() => this.setData());
        this.dialogRef.close(true);
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
