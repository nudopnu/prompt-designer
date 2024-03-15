export interface MessageResponse {
    role: string;
    content: string;
}

export interface UserMessage extends MessageResponse {
    template: string;
}