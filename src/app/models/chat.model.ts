import { MessageTurn } from "./message-turn.model";
import { ModelParams } from "./model-params.model";

export interface Chat {
    uuid: string;
    model_params: ModelParams;
    conversation: Array<string>;
    messageTurns: Array<MessageTurn>;
}