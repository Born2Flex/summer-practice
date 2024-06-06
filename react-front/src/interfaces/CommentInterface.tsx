import User from "./UserInterface";

export default interface Comment {
    id: string;
    text: string;
    user: User;
}