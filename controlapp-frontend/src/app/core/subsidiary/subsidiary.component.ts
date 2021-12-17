import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subsidiary } from './shared/interfaces/subsidiary.interface';
import { EditComponent } from './modals/edit/edit.component';
import { CreateComponent } from './modals/create/create.component';
import { SubsidiaryService } from './shared/services/subsidiary.service';
import Swal from 'sweetalert2';
import { ListDeletedComponent } from './modals/list-deleted/list-deleted.component';
import { dataDisplay } from './shared/constants/table-data-display.constant';
import { ZoneComponent } from '@core/zone/zone.component';

@Component({
  selector: 'app-sucursales',
  templateUrl: './subsidiary.component.html',
})
export class SubsidiaryComponent implements AfterViewInit {
  subsidiaries: Subsidiary[];
  dataDisplay = dataDisplay;

  constructor(private dialog: MatDialog, private _subsidiary: SubsidiaryService) {}

  ngAfterViewInit() {
    this.setData();
  }

  private setData = (hasNew = true) => {
    if (hasNew) {
      this._subsidiary.getAllEnabled().subscribe((subsidiaries) => {
        this.subsidiaries = subsidiaries;
      });
    }
  };

  create(): void {
    this.dialog.open(CreateComponent).afterClosed().subscribe(this.setData);
  }

  edit(subsidiary: Subsidiary): void {
    this.dialog.open(EditComponent, { data: subsidiary }).afterClosed().subscribe(this.setData);
  }

  disabled(subsidiary: Subsidiary): void {
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
        this._subsidiary.disabled(subsidiary).subscribe(() => this.setData());
      }
    });
  }

  showDisabled() {
    this.dialog.open(ListDeletedComponent, { width: '90%' }).afterClosed().subscribe(this.setData);
  }

  zone(): void {
    this.dialog.open(ZoneComponent, { width: '90vw', height: '90vh' }).afterClosed().subscribe(this.setData);
  }
}
