import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { User } from '@core/user/interfaces/user';
import { UserService } from '@core/user/shared/services/user.service';
import { SubsidiaryService } from '@core/subsidiary/shared/services/subsidiary.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  boxes: { title: string; icon: string; amount: number }[] = [];
  lastMembers: User[] = [];

  constructor(private _user: UserService, private _subsidiary: SubsidiaryService) {}

  ngOnInit(): void {
    forkJoin({
      userAmount: this._user.getAmount(),
      subsidiaryAmount: this._subsidiary.getAmount(),
      members: this._user.getLastMembers(),
    }).subscribe(({ userAmount, subsidiaryAmount, members }) => {
      this.setBoxes(userAmount, subsidiaryAmount);
      this.lastMembers = members;
    });
  }

  private setBoxes(userAmount: number, subsidiaryAmount: number) {
    this.boxes.push(
      {
        icon: 'fas fa-users',
        title: 'Usuarios',
        amount: userAmount,
      },
      {
        icon: 'fas fa-building',
        title: 'Sucursales',
        amount: subsidiaryAmount,
      }
    );
  }
}
