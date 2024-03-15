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
  currentConversation: Signal<string[]>;
  isLoading: Signal<boolean>;
  shouldAddTemplate = false;
  settingsVisible = false;
  collectionNameSettingVisible = false;

  constructor(private conversationsService: ConversationsService) {
    this.currentConversation = this.conversationsService.currentMessages;
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
    const template = this.preview.code();
    this.conversationsService.startNewChat(message, template);
    this.shouldAddTemplate = false;
    this.settingsVisible = false;
    this.collectionNameSettingVisible = false;
  }

  onClickSendNextMessage() {
    const message = this.preview.computeMessage();
    const template = this.preview.code();
    this.conversationsService.addMessage(message, template);
    this.shouldAddTemplate = false;
  }

  onClickClear() {
    this.conversationsService.clearCurrentChat();
  }

  onClickUpdateCollection() {

  }

}
