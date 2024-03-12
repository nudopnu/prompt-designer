import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[proMouseEvents]'
})
export class MouseEventsDirective {

  @Output() middleMouseClick = new EventEmitter<MouseEvent>();

  @HostListener('auxclick', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (event.button == 1) {
      this.middleMouseClick.emit(event);
    }
  }

}
