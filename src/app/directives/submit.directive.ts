import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[proSubmit]'
})
export class SubmitDirective {

  @Output()
  onSubmit = new EventEmitter();

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter') return;
    this.onSubmit.emit();
  }

}
