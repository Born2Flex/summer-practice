import ShortEvent from "./ShortEventInterface";

export interface RagMessage {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    events?: ShortEvent[];
}
