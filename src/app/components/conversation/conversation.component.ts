import { Component, ContentChild, Signal, ViewChild, WritableSignal, computed, signal } from '@angular/core';
import { ConversationsService } from '../../services/conversations.service';
import { PromptPreviewComponent } from '../prompt-preview/prompt-preview.component';

@Component({
  selector: 'pro-conversation',
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss'
})
export class ConversationComponent {

  @ContentChild(PromptPreviewComponent) preview!: PromptPreviewComponent;
  model: Signal<string>;
  currentConversation: Signal<string[]>;
  isLoading: WritableSignal<boolean>;
  shouldAddTemplate = false;

  constructor(
    private conversationsService: ConversationsService,
  ) {
    this.model = computed(() => this.conversationsService.models()[0]);
    this.currentConversation = this.conversationsService.currentConversation;
    this.isLoading = conversationsService.isLoading;
  }

  onClickDownloadConversation() {
    const blob = new Blob([JSON.stringify(this.currentConversation())], { type: "application/json" });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = "conversation.json";
    link.click();
  }

  onClickStartNewConversation() {
    const message = this.preview.computeMessage();
    this.conversationsService.startNewChat({ model: this.model(), temperature: 1 }, message);
  }

  onClickSendNextMessage() {
    const message = this.preview.computeMessage();
    this.conversationsService.addMessage(message);
    this.shouldAddTemplate = false;
  }

  onClickClear() {
    this.conversationsService.clearCurrentChat();
  }

}
