import { Message } from "./MessageInterface";
import ShortUser from "./ShortUserInterface";

export default interface Chat {
    id: string;
    participants: ShortUser[];
    messages: Message[];
}