import { Message } from "./MessageInterface";
import ShortUser from "./ShortUserInterface";

export default interface ShortChat {
    id: string;
    participant: ShortUser;
    lastMessage: Message;
}