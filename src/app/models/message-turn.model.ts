import { ChatCompletion } from "./chat-completion.model";
import { UserMessage, MessageResponse } from "./messsage.model";

export interface MessageTurn {
    question: UserMessage;
    answer: MessageResponse;
    completion: ChatCompletion;
}