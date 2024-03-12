import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild, computed, signal } from '@angular/core';
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

}
