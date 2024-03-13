import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Chat } from '../models/chat.model';
import { ModelParams } from '../models/model-params.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ConversationsService {

  models: Signal<string[]>;
  currentConversation: WritableSignal<string[]>;
  isLoading: WritableSignal<boolean>;
  private currentChat: Chat | undefined;

  constructor(private apiService: ApiService) {
    this.models = toSignal(apiService.getModels(), { initialValue: [] });
    this.currentConversation = signal<string[]>([]);
    this.isLoading = signal(false);
  }

  clearCurrentChat() {
    this.currentConversation.set([]);
    this.currentChat = undefined;
  }

  startNewChat(modelParams: ModelParams, message: string) {
    this.isLoading.set(true);
    this.currentConversation.update(chat => ([...chat, message]));
    console.log(this.currentConversation());

    this.apiService.createChat(modelParams)
      .subscribe(chat => {
        this.currentChat = chat;
        this.addMessage(message);
      });
  }

  addMessage(message: string) {
    if (!this.currentChat) throw new Error('current chat is undefined');
    this.isLoading.set(true);
    return this.apiService.addChatMessage(this.currentChat.uuid, { role: 'user', content: message })
      .subscribe(messageTurns => {
        this.isLoading.set(false);
        const messages: string[] = [];
        for (const turn of messageTurns) {
          messages.push(turn.question.content);
          messages.push(turn.answer.content);
        }
        this.currentConversation.set(messages);
        console.log(messageTurns);
      });
  }
}
