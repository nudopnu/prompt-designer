import { Injectable, WritableSignal, model, signal } from '@angular/core';
import { Chat } from '../models/chat.model';
import { ModelParams } from '../models/model-params.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ConversationsService {

  models: WritableSignal<string[]>;
  currentConversation: WritableSignal<string[]>;
  isLoading: WritableSignal<boolean>;
  modelParams: WritableSignal<ModelParams>;
  private currentChat: Chat | undefined;

  constructor(private apiService: ApiService) {
    this.models = signal<string[]>([]);
    this.currentConversation = signal<string[]>([]);
    this.isLoading = signal(false);
    this.apiService.getModels()
      .subscribe(models => {
        this.models.set(models);
        this.modelParams.update(params => ({ ...params, model: models[0] }));
      });
    this.modelParams = signal<ModelParams>({ temperature: 1 });
  }

  clearCurrentChat() {
    this.currentConversation.set([]);
    this.currentChat = undefined;
  }

  startNewChat(message: string) {
    this.isLoading.set(true);
    this.currentConversation.update(chat => ([...chat, message]));
    console.log(this.currentConversation());

    this.apiService.createChat(this.modelParams())
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
