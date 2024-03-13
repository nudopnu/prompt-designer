import { Injectable, WritableSignal, computed, signal } from '@angular/core';

export interface PromptTemplate {
  content: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class PromptsService {

  MOCK: PromptTemplate[] = [
    { content: 'This is a prompt template\n\n{test}', name: 'prompt_01' },
    { content: 'You will be provided a C# function of a .NET Framwork codebase. Generate unit tests using NUnit and optionally Nsubstitute, aiming for full code coverage.\n\n```\npublic class SampleClass\n{\n  {code}\n}\n```', name: 'prompt_02' },
  ]

  prompts = signal<PromptTemplate[]>(this.MOCK);
  selectedTabIndex = signal(0);
  currentTemplateContent = signal("");

  constructor() {
    this.selectTabByIndex(0);
  }

  selectTabByIndex(index: number) {
    this.selectedTabIndex.set(index);
    this.currentTemplateContent.set(this.prompts()[index].content);
  }

  setCurrentTemplateContent(content: string) {
    this.currentTemplateContent.set(content);
    this.prompts()[this.selectedTabIndex()].content = content;
  }

  closeTabByIndex(index: number) {
    this.prompts.update(prompts => prompts.filter((_, idx) => idx !== index));
  }

  addPrompt(promptTemplate: PromptTemplate) {
    this.prompts.update(prompts => ([...prompts, promptTemplate]));
  }

  addNewPrompt() {
    const name = this.newUntitledName();
    const content = "";
    this.addPrompt({ name, content });
    this.selectedTabIndex.set(this.prompts().length - 1);
  }

  private newUntitledName() {
    const givenNumbers = this.prompts()
      .map(prompt => prompt.name)
      .filter(name => name.match(/prompt_[0-9]+/))
      .map(name => Number(name.split('_')[1]))
      .sort();
    let newNumber = givenNumbers.length + 1;
    for (let i = 0; i < givenNumbers.length; i++) {
      const givenNumber = givenNumbers[i];
      if (i + 1 !== givenNumber) {
        newNumber = i + 1;
        break;
      }
    }
    return `prompt_${String(newNumber).padStart(2, '0')}`;
  }
}
