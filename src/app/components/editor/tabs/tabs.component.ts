import { Component, Input } from '@angular/core';
import { PromptsService } from '../../../services/prompts.service';

@Component({
  selector: 'pro-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {

  @Input() isLoading = true;
  selectedIndex = this.promptsService.selectedTabIndex;
  prompts = this.promptsService.prompts;

  constructor(public promptsService: PromptsService) { }

  onMiddleMouseClick(index: number) {
    this.promptsService.closeTabByIndex(index);
  }

  onClose({ index }: { index: number }): void {
    this.promptsService.closeTabByIndex(index);
  }

  onAdd(): void {
    this.promptsService.addNewPrompt();
  }

  onSelectedIndexChange(index: number) {
    this.promptsService.selectTabByIndex(index)
  }
}
