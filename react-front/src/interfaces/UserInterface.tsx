import ShortEvent from "./ShortEventInterface";

export default interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    description: string;
    location: string;
    imgUrl: string;
    numOfComments: number;
    numOfEvents: number;
    events: ShortEvent[];
    numOfFriends: number;
}