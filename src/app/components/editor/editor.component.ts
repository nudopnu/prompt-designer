import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DiffEditorModel } from 'ngx-monaco-editor-v2';

@Component({
  selector: 'pro-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {
  
  @ViewChild('editor') editorRef!: ElementRef;
  @Input() editorOptions = { theme: 'vs-dark', language: 'mylang' };
  @Input() code: string = 'function x() {\nconsole.log("Hello world!");\n}';
  options = {
    theme: 'vs-dark'
  };
  originalModel: DiffEditorModel = {
    code: 'heLLo world!\nMy name is Peter',
    language: 'text/plain'
  };

  modifiedModel: DiffEditorModel = {
    code: 'hello orlando!\nMy name is Peter',
    language: 'text/plain'
  };

}
