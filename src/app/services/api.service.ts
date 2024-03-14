import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from '../models/chat.model';
import { ModelParams } from '../models/model-params.model';
import { first } from 'rxjs';
import { Message } from '../models/messsage.model';
import { MessageTurn } from '../models/message-turn.model';
import { CollectionNameUpdateRequest } from '../models/collection-name-update-request.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL = 'http://localhost:8000'

  constructor(private http: HttpClient) { }

  getModels() {
    return this.http.get<string[]>(`${this.BASE_URL}/models`).pipe(first());
  }

  listChats() {
    return this.http.get<Chat[]>(`${this.BASE_URL}/chats`).pipe(first());
  }

  getChat(id: string) {
    return this.http.get<Chat>(`${this.BASE_URL}/chats/${id}`).pipe(first());
  }

  createChat(modelParams: ModelParams) {
    return this.http.post<Chat>(`${this.BASE_URL}/chats`, modelParams).pipe(first());
  }

  addChatMessage(id: string, message: Message) {
    return this.http.post<MessageTurn[]>(`${this.BASE_URL}/chats/${id}/messages`, message).pipe(first());
  }

  updateChatCollection(id: string, request: CollectionNameUpdateRequest) {
    return this.http.patch<CollectionNameUpdateRequest>(`${this.BASE_URL}/chats/${id}/collection`, request).pipe(first());
  }

}
