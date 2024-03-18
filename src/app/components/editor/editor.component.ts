import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PromptsService } from '../../services/prompts.service';

@Component({
  selector: 'pro-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {

  @ViewChild('editor') editorRef!: ElementRef;
  @Input() editorOptions = { theme: 'vs-dark', language: 'mylang' };
  isLoading = true;

  constructor(private cdr: ChangeDetectorRef, public promptsService: PromptsService) { }

  onInit() {
    this.isLoading = false;
    this.cdr.detectChanges();
  }

  onRequestCopy() {
    const currentTemplate = this.promptsService.currentTemplateContent();
    const clipboardContent = JSON.stringify(currentTemplate).slice(1, -1);
    navigator.clipboard.writeText(clipboardContent);
  }

  onRequestDownload() {
    const currentTemplate = this.promptsService.currentTemplateContent();
    const blob = new Blob([currentTemplate], { type: 'plain/txt' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = this.promptsService.prompts()[this.promptsService.selectedTabIndex()].name;
    link.click();
    link.remove();
  }

}
