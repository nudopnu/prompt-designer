import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { first } from 'rxjs';
import { Chat, ChatCreateRequest, ChatResponse, ChatUpdateRequest } from '../models/chat.model';
import { MessageTurn } from '../models/message-turn.model';
import { ModelParams } from '../models/model-params.model';
import { UserMessage } from '../models/messsage.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = signal('http://localhost:8000');

  constructor(private http: HttpClient) { }

  listChats() {
    return this.http.get<ChatResponse[]>(`${this.baseUrl()}/chats`).pipe(first());
  }

  createChat(createRequest: ChatCreateRequest) {
    return this.http.post<ChatResponse>(`${this.baseUrl()}/chats`, createRequest).pipe(first());
  }

  getChat(id: string) {
    return this.http.get<ChatResponse>(`${this.baseUrl()}/chats/${id}`).pipe(first());
  }

  updateChat(id: string, updateRequest: ChatUpdateRequest) {
    return this.http.patch<ChatResponse>(`${this.baseUrl()}/chats/${id}`, updateRequest).pipe(first());
  }

  deleteChat(id: string) {
    return this.http.delete<ChatResponse>(`${this.baseUrl()}/chats/${id}`).pipe(first());
  }

  listChatMessages(id: string) {
    return this.http.get<MessageTurn[]>(`${this.baseUrl()}/chats/${id}`).pipe(first());
  }

  createChatMessage(chatId: string, message: UserMessage) {
    return this.http.post<MessageTurn[]>(`${this.baseUrl()}/chats/${chatId}/messages`, message).pipe(first());
  }

  listAvailableModels() {
    return this.http.get<string[]>(`${this.baseUrl()}/models`).pipe(first());
  }

}
