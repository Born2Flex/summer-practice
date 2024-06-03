// import React, { ReactNode, createContext, useContext, useState } from 'react';

// export interface Event {
//     id: string;
//     title: string;
//     description: string;
//     locationName: string;
//     availability: string;
//     eventType: string;
//     currentParticipants: number;
//     maxParticipants: number;
//     entranceFee: number;
//     location: {
//         x: number;
//         y: number;
//     };
// }

// interface EventsContextType {
//     events: Event[];
//     setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
// }

// const EventsContext = createContext<EventsContextType | undefined>(undefined);

// export const useEventsContext = () => {
//     const context = useContext(EventsContext);
//     if (!context) {
//         throw new Error('useEventsContext must be used within a EventsProvider');
//     }
//     return context;
// };

// interface EventsProviderProps {
//     children: ReactNode;
// }

// export const EventsProvider = ({ children } : EventsProviderProps)=> {
//     const [events, setEvents] = useState<Event[]>([]);

//     return (
//         <EventsContext.Provider value={{ events, setEvents }}>
//             {children}
//         </EventsContext.Provider>
//     );
// };
