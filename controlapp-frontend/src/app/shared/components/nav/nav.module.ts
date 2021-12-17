import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { ActiveMenuClassDirective } from './directives/active-menu-class.directive';
import { ScrollToggleTopDownDirective } from './directives/scroll-toggle-top-down.directive';
import { OverloadToggleDirective } from './directives/overload-toggle.directive';

@NgModule({
  declarations: [MainComponent, ScrollToggleTopDownDirective, ActiveMenuClassDirective, OverloadToggleDirective],
  imports: [CommonModule, RouterModule],
  exports: [MainComponent],
})
export class NavModule {}
