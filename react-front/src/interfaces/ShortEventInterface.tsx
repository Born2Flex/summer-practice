export default interface ShortEventInterface {
    id: string;
    title: string;
    description: string;
    locationName: string;
    availability: string;
    eventType: string;
    currentParticipants: number;
    maxParticipants: number;
    entranceFee?: number;
    location: {
        x: number;
        y: number;
    };
}