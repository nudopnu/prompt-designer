import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild, input } from '@angular/core';
import { snippets } from '../../modules/monaco/monaco.module';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'pro-prompt-preview',
  templateUrl: './prompt-preview.component.html',
  styleUrl: './prompt-preview.component.scss'
})
export class PromptPreviewComponent implements OnChanges {

  @ViewChild('codeRef') codeRef!: ElementRef;
  @Input() code = "";

  innerHtml: SafeHtml = "";

  constructor(private domSanatizer: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges): void {
    const innerHtml = this.code.replace(/\{(\w+)\}/g, (match, key) => snippets[key] ? toSpan(key) : match);
    this.innerHtml = this.domSanatizer.bypassSecurityTrustHtml(innerHtml);

    function toSpan(key: any): string {
      return `<span style="color: orange;">${snippets[key]}</span>`;
    }
  }

  copyPromptToClipboard() {
    navigator.clipboard.writeText(this.codeRef.nativeElement.innerText);
  }
}
