import { Component, Input, OnInit } from '@angular/core';
import { User } from '@core/user/interfaces/user';
import { environment } from '@env';

@Component({
  selector: 'app-last-members',
  templateUrl: './last-members.component.html',
})
export class LastMembersComponent implements OnInit {
  API = environment.API + '/';
  @Input() users: User[] = [];
  constructor() {}

  ngOnInit(): void {}
}
