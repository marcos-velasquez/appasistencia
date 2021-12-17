import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RolesToSpanishPipe } from './shared/pipes/roles-to-spanish.pipe';
import { CreateComponent } from './modals/create/create.component';
import { EditComponent } from './modals/edit/edit.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ListDeletedComponent } from './modals/list-deleted/list-deleted.component';
import { SharedModule } from '@shared/shared.module';
@NgModule({
  declarations: [CreateComponent, EditComponent, ListDeletedComponent, RolesToSpanishPipe, UserComponent],
  imports: [CommonModule, UserRoutingModule, ReactiveFormsModule, SharedModule],
  providers: [],
})
export class UserModule {}
