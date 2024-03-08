import { Component } from '@angular/core';
import { snippets } from '../modules/monaco/monaco.module';

@Component({
  selector: 'pro-snippets',
  templateUrl: './snippets.component.html',
  styleUrl: './snippets.component.scss'
})
export class SnippetsComponent {

  panels = Object.keys(snippets).map(keyword => ({
    name: `{${keyword}}`,
    content: snippets[keyword],
    active: false,
    disabled: false
  }));

  panels2 = [
    {
      active: true,
      name: 'This is panel header 1',

    },
    {

      disabled: false,
      name: 'This is panel header 2'
    },
    {
      active: false,
      disabled: true,
      name: 'This is panel header 3'
    }
  ];

}
