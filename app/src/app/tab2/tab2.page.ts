import { ModalController, ToastController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Permission } from './services/permission.service';
import { TracingComponent } from './components/tracing/tracing.component';
import { SubsidiaryService } from '@shared/services/subsidiary.service';
import { Subsidiary } from '@shared/interfaces/subsidiary.interface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
})
export class Tab2Page {
  subsidiaries: Subsidiary[];
  constructor(
    private _subsidiary: SubsidiaryService,
    private _modal: ModalController,
    private _toast: ToastController
  ) {}

  ngOnInit() {
    this._subsidiary.getAll().subscribe((subsidiaries) => {
      this.subsidiaries = subsidiaries;
    });
  }

  async ngAfterViewInit() {
    if (!(await new Permission().isGranted())) {
      (await this._toast.create({ message: 'DEBE PERMITIR OBTENER LA UBICACIÓN', color: 'danger' })).present();
    }
  }

  async tracing(subsidiary: Subsidiary) {
    (await this._modal.create({ component: TracingComponent, componentProps: { subsidiary } })).present();
  }
}
