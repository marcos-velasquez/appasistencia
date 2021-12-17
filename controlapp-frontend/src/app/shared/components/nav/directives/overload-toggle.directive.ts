import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOverloadToggle]',
})
export class OverloadToggleDirective {
  constructor(private element: ElementRef<HTMLElement>) {}

  @HostListener('click')
  toggle() {
    this.element.nativeElement.previousElementSibling.classList.toggle('sidebar--active');
  }
}
