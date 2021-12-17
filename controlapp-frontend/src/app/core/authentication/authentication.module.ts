import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { ModifyPasswordComponent } from './modify-password/modify-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { LayoutComponent } from './shared/layout/layout.component';

import { StorageTokenService } from './shared/services/storage-token.service';
import { HTTP_JWT_INTERCEPTOR } from './shared/interceptors/jwt.interceptor';
import { JwtService } from './shared/services/jwt.service';
import { LoginGuard } from './shared/guards/login.guard';
import { TogglePasswordDirective } from './shared/directives/toggle-password.directive';

@NgModule({
  declarations: [
    LoginComponent,
    ModifyPasswordComponent,
    RecoverPasswordComponent,
    TogglePasswordDirective,
    LayoutComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
  providers: [HTTP_JWT_INTERCEPTOR, StorageTokenService, LoginGuard, JwtService],
})
export class AuthenticationModule {}
