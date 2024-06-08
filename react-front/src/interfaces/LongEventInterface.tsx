import Host from "./HostInterface";
import Location from "./LocationInterface";
import Comment from "./CommentInterface";
import ShortUser from "./ShortUserInterface";

export interface LongEvent {
    id: string;
    title: string;
    host: Host;
    availability: string;
    currentParticipants: number;
    maxParticipants: number | null;
    entranceFee: number | null;
    eventType: string;
    description: string;
    locationName: string;
    location: Location;
    startDateTime: string;
    comments: Comment[];
    tags: string[];
    imgUrl: string | null;
    participants: ShortUser[];
}