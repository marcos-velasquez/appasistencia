import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTogglePassword]',
})
export class TogglePasswordDirective {
  private input: HTMLInputElement;
  private typeInput = 'password';

  constructor(private element: ElementRef<HTMLInputElement>) {
    this.setEyeSlash()
    this.input = element.nativeElement.parentElement.querySelector('input')
  }

  @HostListener('click', ['$event'])
  private changeTypeInput(event: any) {
    this.typeInput = this.typeInputIsPassword ? 'text' : 'password';
    this.typeInputIsPassword ? this.setEyeSlash() : this.setEye()
    this.input.setAttribute("type",this.typeInput)
  }

  private get typeInputIsPassword() {
    return this.typeInput === 'password';
  }

  private setEye() {
    this.element.nativeElement.className = 'fas fa-eye input__icon';
  }

  private setEyeSlash(){
    this.element.nativeElement.className = 'fas fa-eye-slash input__icon';
  }
}
