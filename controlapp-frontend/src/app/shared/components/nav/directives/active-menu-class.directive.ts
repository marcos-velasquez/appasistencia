import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appActiveMenuClass]',
})
export class ActiveMenuClassDirective {
  constructor(private element: ElementRef<HTMLElement>) {}

  @HostListener('click', ['$event.target'])
  toggle() {
    this.element.nativeElement.nextElementSibling.classList.toggle('sidebar--active');
  }
}
