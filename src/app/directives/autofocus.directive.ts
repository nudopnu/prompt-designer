import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[proAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const element = this.elementRef.nativeElement;
      element.focus();

      if (element instanceof HTMLInputElement) {
        element.setSelectionRange(0, element.value.length);
      }
    });
  }
}
