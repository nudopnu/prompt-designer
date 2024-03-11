import { Component, signal } from '@angular/core';
import { snip } from '../modules/monaco/monaco.module';

@Component({
  selector: 'pro-snippets',
  templateUrl: './snippets.component.html',
  styleUrl: './snippets.component.scss'
})
export class SnippetsComponent {

  private snippets = snip();
  panels = Object.keys(snip()).map(keyword => {
    const snippets = snip();
    return {
      name: `{${keyword}}`,
      content: snippets[keyword as keyof typeof snippets],
      active: false,
      disabled: false,
      keyword: keyword as keyof typeof snippets,
    };
  });

  updateSnippetKeyword(oldKeyword: keyof typeof this.snippets, newKeyword: string) {
    snip.update(oldSnippets => {
      const newSnippets = { ...oldSnippets };
      const oldValue = oldSnippets[oldKeyword]();
      delete newSnippets[oldKeyword];
      newSnippets[newKeyword as keyof typeof this.snippets] = signal(oldValue);
      return newSnippets;
    });
  }

  updateSnippetContent(keyword: keyof typeof this.snippets, content: string) {
    snip.update(oldSnippets => {
      const newSnippets = { ...oldSnippets };
      newSnippets[keyword].set(content);
      return newSnippets;
    });
  }

}
