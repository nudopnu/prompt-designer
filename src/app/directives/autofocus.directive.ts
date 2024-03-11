import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[proAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
  }
}
