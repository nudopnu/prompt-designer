import { Injectable, Signal, signal } from '@angular/core';
import { combineLatest, first } from 'rxjs';
import { nextNumbered } from '../lib/utils';
import { ChatCreateRequest, ChatResponse } from '../models/chat.model';
import { MessageTurn } from '../models/message-turn.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ConversationsService {

  host = this.apiService.baseUrl;
  models: Signal<string[]>;
  chats: Signal<ChatResponse[]>;
  isLoading: Signal<boolean>;
  currentChatSettings: Signal<ChatCreateRequest | undefined>;
  currentMessages: Signal<string[]>;
  currentChat: Signal<ChatResponse | undefined>;

  private _isLoading = signal<boolean>(false);
  private _models = signal<string[]>([]);
  private _chats = signal<ChatResponse[]>([]);
  private _currentChat = signal<ChatResponse | undefined>(undefined);
  private _currentChatSettings = signal<ChatCreateRequest | undefined>(undefined);
  private _currentMessages = signal<string[]>([]);

  constructor(private apiService: ApiService) {
    this.isLoading = this._isLoading.asReadonly();
    this.models = this._models.asReadonly();
    this.chats = this._chats.asReadonly();
    this.currentChatSettings = this._currentChatSettings.asReadonly();
    this.currentMessages = this._currentMessages.asReadonly();
    this.currentChat = this._currentChat.asReadonly();
    this.firstInit();
  }

  private firstInit() {
    const chats = this.apiService.listChats();
    const models = this.apiService.listAvailableModels();
    combineLatest({ chats, models })
      .pipe(first())
      .subscribe(result => {
        const { chats, models } = result;
        this._chats.set(chats);
        this._models.set(models);
        this.initDefaultSettings(chats, models);
        console.log(this.currentChatSettings());
      });
  }

  private initDefaultSettings(chats: ChatResponse[], models: string[]) {
    const name = nextNumbered(chats.map(chat => chat.name), 'chat');
    const collection_name = nextNumbered(chats.map(chat => chat.name), 'collection');
    const model = models[0];
    const temperature = 0;
    const model_params = {
      model,
      temperature,
    };
    this._currentChatSettings.set({
      model_params,
      collection_name,
      name,
    });
  }

  fetchModels() {
    this.apiService.listAvailableModels()
      .subscribe(models => {
        this._models.set(models);
      });
  }

  fetchChats() {
    this.apiService.listChats()
      .subscribe(chats => {
        this._chats.set(chats);
      });
  }

  setChatSettings(settings: ChatCreateRequest) {
    this._currentChatSettings.set(settings);
  }

  updateChatSettings(update: (settings: ChatCreateRequest | undefined) => ChatCreateRequest | undefined) {
    this._currentChatSettings.update(update);
  }

  startNewChat(message: string, template: string) {
    const chatSettings = this.currentChatSettings();
    if (!chatSettings) throw new Error('chat settings are undefined');
    this._isLoading.set(true);

    this.apiService.createChat(chatSettings)
      .subscribe(chat => {
        this._currentChat.set(chat);
        this.addMessage(message, template);
      });
  }

  addMessage(message: string, template: string) {
    const currentChat = this.currentChat();
    if (!currentChat) throw new Error('current chat is undefined');
    this._isLoading.set(true);

    const userMessage = { role: 'user', content: message, template };
    return this.apiService.createChatMessage(currentChat.uuid, userMessage)
      .subscribe(messageTurns => {
        const messages: string[] = this.toMessages(messageTurns);
        this._currentMessages.set(messages);
        this._isLoading.set(false);
        console.log(messageTurns);
      });
  }

  clearCurrentChat() {
    this._currentMessages.set([]);
  }

  private toMessages(messageTurns: MessageTurn[]) {
    const messages: string[] = [];
    for (const turn of messageTurns) {
      messages.push(turn.question.content);
      messages.push(turn.answer.content);
    }
    return messages;
  }

}
