import { Directive, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { auditTime, map, pluck, tap } from 'rxjs/operators';

@Directive({
  selector: '[appScrollToggleTopDown]',
})
export class ScrollToggleTopDownDirective {
  private oldScroll = 9999;
  constructor(private elementRef: ElementRef<HTMLElement>) {
    this.elementRef.nativeElement.classList.add('fixed');
    this.elementRef.nativeElement.classList.add('transition-all');
    this.elementRef.nativeElement.classList.add('duration-200');
    this.elementRef.nativeElement.classList.add('w-screen');
    this.scroll();
  }

  scroll() {
    fromEvent(window, 'scroll')
      .pipe(
        auditTime(300),
        pluck<Event, any>('target'),
        map((document) => {
          const currentScroll = document.scrollingElement?.scrollTop!;
          currentScroll > this.oldScroll
            ? this.elementRef.nativeElement.classList.add('opacity-0')
            : this.elementRef.nativeElement.classList.remove('opacity-0');
          this.oldScroll = currentScroll;
        })
      )
      .subscribe();
  }
}
