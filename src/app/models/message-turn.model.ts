import { ChatCompletion } from "./chat-completion.model";
import { Message } from "./messsage.model";

export interface MessageTurn {
    question: Message;
    answer: Message;
    completion: ChatCompletion;
}