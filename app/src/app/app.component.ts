import { Component } from '@angular/core';
import { AuthService } from '@app/authentication/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(public _auth: AuthService) {}

  doRefresh(event) {
    location.reload();
    event.target.complete();
  }
}
