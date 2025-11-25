export default interface ShortEvent {
    id: string;
    title: string;
    description: string;
    locationName: string;
    availability: string;
    eventType: string;
    currentParticipants: number;
    maxParticipants: number;
    entranceFee?: number;
    startDateTime: string;
    host: {
        id: string;
        firstName: string;
        lastName: string;
        imgUrl?: string;
    };
    location: {
        x: number;
        y: number;
    };
}