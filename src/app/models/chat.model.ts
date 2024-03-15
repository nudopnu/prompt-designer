import { MessageTurn } from "./message-turn.model";
import { ModelParams } from "./model-params.model";

export interface ChatUpdateRequest {
    name: string;
    collection_name: string;
}

export interface ChatCreateRequest extends ChatUpdateRequest {
    model_params: ModelParams;
}

export interface ChatResponse extends ChatCreateRequest {
    uuid: string;
}

export interface Chat extends ChatResponse {
    conversation: Array<string>;
    messageTurns: Array<MessageTurn>;
}