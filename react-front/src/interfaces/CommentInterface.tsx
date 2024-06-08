import ShortUser from "./ShortUserInterface";

export default interface Comment {
    id: string;
    text: string;
    user: ShortUser;
}