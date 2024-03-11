import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'pro-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {

  @Input() isLoading = true;
  tabs = ['prompt_01', 'prompt_02'];
  selectedIndex = 0;

  closeTab({ index }: { index: number }): void {
    this.tabs.splice(index, 1);
  }

  newTab(): void {
    this.tabs.push(`prompt_0${this.tabs.length + 1}`);
    this.selectedIndex = this.tabs.length;
  }
}
