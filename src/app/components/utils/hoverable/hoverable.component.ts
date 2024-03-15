import { Component, HostListener, model } from '@angular/core';

@Component({
  selector: 'pro-hoverable',
  templateUrl: './hoverable.component.html',
  styleUrl: './hoverable.component.scss'
})
export class HoverableComponent {

  isHovered = model(false);
  
  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHovered.set(true);
  }

  @HostListener('mouseleave')
  onMouseLeave(){
    this.isHovered.set(false);
  }

}
