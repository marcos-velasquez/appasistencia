import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginGuard } from './guards/login.guard';
import { TogglePasswordDirective } from './directives/toggle-password.directive';
import { RecoveryPasswordComponent } from './components/recovery-password/recovery-password.component';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationPageRoutingModule } from './authentication-routing.module';
import { AuthenticationPage } from './authentication.page';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IonicModule, AuthenticationPageRoutingModule],
  declarations: [
    AuthenticationPage,
    LoginComponent,
    RecoveryPasswordComponent,
    TogglePasswordDirective,
    ChangePasswordComponent,
  ],
  providers: [LoginGuard],
})
export class AuthenticationPageModule {}
