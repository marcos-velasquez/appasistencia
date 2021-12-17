import { Component } from '@angular/core';
import { Assistance } from '@shared/interfaces/assistance.interface';
import { AssistanceService } from '@shared/services/assistance.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
})
export class Tab3Page {
  assistance: Assistance;
  constructor(private _assistance: AssistanceService) {}

  ngOnInit() {}

  getAssistance(event: any) {
    this._assistance.getOne(event.detail.value).subscribe((assistance) => {
      this.assistance = assistance;
    });
  }
}
