import { LayoutComponent } from './shared/layout/layout.component';
import { LoginGuard } from './shared/guards/login.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyPasswordComponent } from './modify-password/modify-password.component';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'nueva-credencial/:token',
        component: ModifyPasswordComponent,
      },
      {
        path: 'recuperar-contraseña',
        component: RecoverPasswordComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
