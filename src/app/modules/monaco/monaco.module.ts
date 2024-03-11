import { NgModule, signal } from '@angular/core';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

export const snip = signal({
  "test": "I am a snippet",
  "abc": "The alphabet",
});

export function onMonacoLoad() {
  const monaco = (window as any).monaco;
  monaco.languages.register({ id: 'mylang' });
  monaco.languages.setMonarchTokensProvider('mylang', {
    tokenizer: {
      root: [
        [/@?[a-zA-Z][\w$]*/, {
          cases: {
            '@default': 'variable',
          }
        }],
        [/\{[a-zA-Z]*\}/, 'keyword'],
        [/\{.*\}/, 'string'],
      ]
    }
  });

  function createDependencyProposals(range: any) {
    // returning a static list of proposals, not even looking at the prefix (filtering is done by the Monaco editor),
    // here you could do a server side lookup
    const snippets = snip();
    return Object.keys(snippets).map(keyword => ({
      label: keyword,
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: `${keyword}}`,
      range: range,
    }));
  }

  monaco.languages.registerCompletionItemProvider("mylang", {
    triggerCharacters: ['{'],
    provideCompletionItems: function (model: any, position: any) {
      // find out if we are completing a property in the 'dependencies' object.
      var textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });
      var match = textUntilPosition.match(
        /\{[a-zA-Z]*/
      );
      if (!match) {
        return { suggestions: [] };
      }
      var word = model.getWordUntilPosition(position);
      var range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      return {
        suggestions: createDependencyProposals(range),
      };
    },
  });
}

@NgModule({
  declarations: [],
  imports: [
    MonacoEditorModule.forRoot({
      onMonacoLoad,
    }),
  ],
  exports: [
    MonacoEditorModule,
  ]
})
export class MonacoModule { }
