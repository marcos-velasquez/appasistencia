import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { SnackbarService } from './services/snackbar.service';

const MODULES = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatTableModule,
  MatDialogModule,
  MatPaginatorModule,
  MatSortModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatSelectModule,
  MatListModule,
  MatDividerModule,
  MatTabsModule,
];

@NgModule({
  providers: [SnackbarService],
  imports: [MatSnackBarModule, ...MODULES],
  exports: MODULES,
})
export class MaterialModule {}
