import { Component, ElementRef, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'pro-hidable',
  template: '<ng-content></ng-content>',
  styles: [`
:host {
  display: block;
  overflow: hidden;
  transition: max-height 200ms ease;
}

:host.hidden {
  max-height: 0 !important;
  transition: max-height 200ms ease;
}
`]
})
export class HidableComponent implements OnChanges {

  @Input() hidden = false;
  _isHidden = false

  @HostBinding('class.hidden') private get isHidden() {
    return this._isHidden;
  }

  constructor(private elementRef: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hidden'].firstChange) this._isHidden = this.hidden;
    const element = this.elementRef.nativeElement as HTMLElement;
    if (this.hidden && element.style.maxHeight === '') {
      const { height } = element.getBoundingClientRect();
      element.style.maxHeight = `${height + 10}px`;
    }
    setTimeout(() => this._isHidden = this.hidden);
  }

}

