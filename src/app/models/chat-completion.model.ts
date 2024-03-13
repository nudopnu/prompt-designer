export interface ChatCompletion {
    id: string;
    choices: Choice[];
    created: number;
    model: string;
    object: string;
    system_fingerprint: any;
    usage: Usage;
    prompt_filter_results: PromptFilterResult[];
}

export interface Choice {
    finish_reason: string
    index: number
    logprobs: any
    message: Message
    content_filter_results: ContentFilterResults
}

export interface Message {
    content: string
    role: string
    function_call: any
    tool_calls: any
}

export interface ContentFilterResults {
    hate: Hate
    self_harm: SelfHarm
    sexual: Sexual
    violence: Violence
}

export interface Hate {
    filtered: boolean
    severity: string
}

export interface SelfHarm {
    filtered: boolean
    severity: string
}

export interface Sexual {
    filtered: boolean
    severity: string
}

export interface Violence {
    filtered: boolean
    severity: string
}

export interface Usage {
    completion_tokens: number
    prompt_tokens: number
    total_tokens: number
}

export interface PromptFilterResult {
    prompt_index: number
    content_filter_results: ContentFilterResults
}