import { Component, Input } from '@angular/core';

@Component({
  selector: 'pro-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {

  @Input() message: string = "";

  copyMessageToClipboard() {
    navigator.clipboard.writeText(this.message);
  }

}
