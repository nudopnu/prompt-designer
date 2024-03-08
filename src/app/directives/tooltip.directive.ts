import { Directive, HostListener, Input } from '@angular/core';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';

@Directive({
  selector: '[proTooltip]'
})
export class TooltipDirective extends NzTooltipDirective {

  @Input() tooltipMouseClickDelay: number = 1000;

  @HostListener('click')
  private onClick() {
    setTimeout(() => {
      this.hide();
    }, this.tooltipMouseClickDelay);
  }

}
