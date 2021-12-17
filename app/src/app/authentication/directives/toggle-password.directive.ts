import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTogglePassword]',
})
export class TogglePasswordDirective {
  private input: HTMLIonInputElement;
  private typeInput = 'password';

  constructor(private element: ElementRef<HTMLInputElement>) {
    this.setEyeSlash();
    element.nativeElement.parentElement.className += 'relative w-full';
    element.nativeElement.className = 'absolute -right-0 bottom-0 z-20';
    this.input = element.nativeElement.parentElement.querySelector('ion-input');
  }

  @HostListener('click', ['$event'])
  private changeTypeInput(event: any) {
    this.typeInput = this.typeInputIsPassword ? 'text' : 'password';
    this.typeInputIsPassword ? this.setEyeSlash() : this.setEye();
    this.input.setAttribute('type', this.typeInput);
  }

  private get typeInputIsPassword() {
    return this.typeInput === 'password';
  }

  private setEye() {
    this.element.nativeElement.innerHTML = '<ion-icon name="eye-outline" size="large"></ion-icon>';
  }

  private setEyeSlash() {
    this.element.nativeElement.innerHTML = '<ion-icon name="eye-off-outline" size="large"></ion-icon>';
  }
}
