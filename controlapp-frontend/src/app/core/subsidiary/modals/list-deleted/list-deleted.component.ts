import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SubsidiaryService } from '@core/subsidiary/shared/services/subsidiary.service';
import { SnackbarService } from '@shared/material/services/snackbar.service';
import { SubsidiaryComponent } from '@core/subsidiary/subsidiary.component';
import { Subsidiary } from './../../shared/interfaces/subsidiary.interface';

@Component({
  selector: 'app-list-deleted',
  templateUrl: './list-deleted.component.html',
})
export class ListDeletedComponent implements OnInit {
  subsidiaries: Subsidiary[] = [];
  private copy: Subsidiary[] = [];

  constructor(
    private _subsidiary: SubsidiaryService,
    public dialogRef: MatDialogRef<SubsidiaryComponent>,
    private _snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this._subsidiary.getAllDisabled().subscribe((subsidiaries) => {
      this.subsidiaries = subsidiaries;
      this.copy = this.subsidiaries;
    });
  }

  filter({ target }) {
    this.subsidiaries = this.copy.filter((subsidiary) => subsidiary.name.includes(target.value));
  }

  restore(subsidairy: Subsidiary, index: number) {
    this._subsidiary.enabled(subsidairy).subscribe(
      (message: string) => {
        this._snackbar.success(message);
        this.ngOnInit();
        this.dialogRef.close(true);
      },
      (message) => {
        this._snackbar.error(message);
      }
    );
  }

  remove(subsidiary: Subsidiary): void {
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
        this._subsidiary.delete(subsidiary).subscribe(
          () => this.ngOnInit(),
          (message: string) => {
            this._snackbar.error(message);
          }
        );
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
