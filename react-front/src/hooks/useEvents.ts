import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../utils/apiClient';

interface ShortEvent {
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

interface EventDetails extends ShortEvent {
    host: {
        id: string;
        firstName: string;
        lastName: string;
        imageUrl?: string;
    };
    participants: Array<{
        id: string;
        firstName: string;
        lastName: string;
        imageUrl?: string;
    }>;
    comments: Array<{
        id: string;
        text: string;
        author: {
            id: string;
            firstName: string;
            lastName: string;
            imageUrl?: string;
        };
        createdAt: string;
    }>;
}

interface EventSearchParams {
    'event-type'?: string[];
    'event-category'?: string[];
    from?: string;
    to?: string;
    tag?: string[];
    'search-value'?: string;
    'event-distance'?: number;
    longitude: number;
    latitude: number;
}

interface EventCreationData {
    title: string;
    description: string;
    location: {
        latitude: number;
        longitude: number;
        city: string;
        address: string;
    };
    date: string;
    type: string;
    availability: string;
    maxParticipants?: number;
    tags: string[];
    imageUrl?: string;
}

export const eventKeys = {
    all: ['events'] as const,
    lists: () => [...eventKeys.all, 'list'] as const,
    list: (params: EventSearchParams) => [...eventKeys.lists(), params] as const,
    details: () => [...eventKeys.all, 'detail'] as const,
    detail: (id: string) => [...eventKeys.details(), id] as const,
    types: () => [...eventKeys.all, 'types'] as const,
};

export const useEvents = (params?: EventSearchParams) => {
    return useQuery({
        queryKey: params ? eventKeys.list(params) : eventKeys.lists(),
        queryFn: async (): Promise<ShortEvent[]> => {
            const url = params 
                ? `/go-event-flow/events/search?${new URLSearchParams(
                    Object.entries(params).reduce((acc, [key, value]) => {
                        if (Array.isArray(value)) {
                            value.forEach(v => acc.append(key, v));
                        } else if (value !== undefined) {
                            acc.append(key, value.toString());
                        }
                        return acc;
                    }, new URLSearchParams())
                ).toString()}`
                : '/go-event-flow/events';
            
            return apiClient.getJson<ShortEvent[]>(url);
        },
        enabled: !params || (!!params?.longitude && !!params?.latitude), 
    });
};

export const useEvent = (eventId: string) => {
    return useQuery({
        queryKey: eventKeys.detail(eventId),
        queryFn: (): Promise<EventDetails> => 
            apiClient.getJson<EventDetails>(`/go-event-flow/events/${eventId}`),
        enabled: !!eventId,
    });
};

export const useEventTypes = () => {
    return useQuery({
        queryKey: eventKeys.types(),
        queryFn: (): Promise<string[]> => 
            apiClient.getJson<string[]>('/go-event-flow/events/types'),
        staleTime: 30 * 60 * 1000, 
    });
};

export const useCreateEvent = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (eventData: EventCreationData): Promise<EventDetails> =>
            apiClient.postJson<EventDetails>('/go-event-flow/events', eventData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
        },
    });
};

export const useParticipateInEvent = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (eventId: string): Promise<void> =>
            apiClient.patchJson<void>(`/go-event-flow/events/${eventId}/participate`),
        onSuccess: (_, eventId) => {
            queryClient.invalidateQueries({ queryKey: eventKeys.detail(eventId) });
            queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
        },
    });
};

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (eventId: string): Promise<void> =>
            apiClient.delete(`/go-event-flow/events/${eventId}`).then(() => {}),
        onSuccess: (_, eventId) => {
            queryClient.removeQueries({ queryKey: eventKeys.detail(eventId) });
            queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
        },
    });
};

export const useAddComment = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ eventId, text }: { eventId: string; text: string }) =>
            apiClient.postJson(`/go-event-flow/events/${eventId}/comment`, { text }),
        onSuccess: (_, { eventId }) => {
            queryClient.invalidateQueries({ queryKey: eventKeys.detail(eventId) });
        },
    });
};
