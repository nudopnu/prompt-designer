import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'pro-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {

  @ViewChild('editor') editorRef!: ElementRef;
  @Input() editorOptions = { theme: 'vs-dark', language: 'mylang' };
  code = 'This is a prompt template.\n\n{test}';

}
