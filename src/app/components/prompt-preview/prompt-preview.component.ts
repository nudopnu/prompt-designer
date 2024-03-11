import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild, computed, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { snip } from '../../modules/monaco/monaco.module';

@Component({
  selector: 'pro-prompt-preview',
  templateUrl: './prompt-preview.component.html',
  styleUrl: './prompt-preview.component.scss'
})
export class PromptPreviewComponent {

  @ViewChild('codeRef') codeRef!: ElementRef;
  code = input<string>("");
  innerHtml = computed(() => this.computeInnerHtml());

  constructor(private domSanatizer: DomSanitizer) { }

  copyPromptToClipboard() {
    navigator.clipboard.writeText(this.codeRef.nativeElement.innerText);
  }

  private computeInnerHtml() {
    const snippets = snip();
    const innerHtml = this.code()
      .replace(/\{(\w+)\}/g, (match, key: keyof typeof snippets) => snippets[key] ? this.toSpan(snippets[key]()) : match);
    return this.domSanatizer.bypassSecurityTrustHtml(innerHtml);
  }

  private toSpan(innerHtml: string): string {
    return `<span style="color: orange;">${innerHtml}</span>`;
  }
}
