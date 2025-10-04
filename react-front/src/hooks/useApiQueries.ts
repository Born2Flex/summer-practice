import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, loaderApiClient, publicApiClient } from '../utils/apiClient';
import { LatLngExpression } from 'leaflet';

// Types
import ShortEvent from '../interfaces/ShortEventInterface';
import UserInterface from '../interfaces/UserInterface';
import Chat from '../interfaces/ChatInterface';
import ShortChat from '../interfaces/ShortChatInterface';

// Query Keys
export const queryKeys = {
  events: ['events'] as const,
  eventsSearch: (params: string) => ['events', 'search', params] as const,
  eventTypes: ['event-types'] as const,
  user: (userId: string) => ['user', userId] as const,
  chat: (chatId: string) => ['chat', chatId] as const,
  chats: ['chats'] as const,
  eventDetails: (eventId: string) => ['event', eventId] as const,
};

// Events Queries
export const useEvents = () => {
  return useQuery({
    queryKey: queryKeys.events,
    queryFn: async (): Promise<ShortEvent[]> => {
      try {
        return await loaderApiClient.getJson<ShortEvent[]>('/go-event-flow/events');
      } catch (error) {
        console.error('Error fetching events:', error);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSearchEvents = (searchParams: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: queryKeys.eventsSearch(searchParams),
    queryFn: async (): Promise<ShortEvent[]> => {
      try {
        return await loaderApiClient.getJson<ShortEvent[]>(`/go-event-flow/events/search?${searchParams}`);
      } catch (error) {
        console.error('Error fetching events:', error);
        return [];
      }
    },
    enabled: enabled && searchParams !== '',
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
  });
};

export const useEventTypes = () => {
  return useQuery({
    queryKey: queryKeys.eventTypes,
    queryFn: async () => {
      return await apiClient.getJson('/go-event-flow/events/types');
    },
    staleTime: 30 * 60 * 1000, // 30 minutes - event types rarely change
  });
};

export const useEventDetails = (eventId: string) => {
  return useQuery({
    queryKey: queryKeys.eventDetails(eventId),
    queryFn: async () => {
      return await apiClient.getJson(`/go-event-flow/events/${eventId}`);
    },
    enabled: !!eventId,
  });
};

// User Queries
export const useUser = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.user(userId),
    queryFn: async (): Promise<UserInterface> => {
      return await apiClient.getJson(`/go-event-flow/users/${userId}`);
    },
    enabled: !!userId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Chat Queries
export const useChats = () => {
  return useQuery({
    queryKey: queryKeys.chats,
    queryFn: async (): Promise<ShortChat[]> => {
      try {
        return await loaderApiClient.getJson<ShortChat[]>('/go-event-flow/chats');
      } catch (error) {
        console.error('Error fetching chats:', error);
        return [];
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useChat = (chatId: string) => {
  return useQuery({
    queryKey: queryKeys.chat(chatId),
    queryFn: async (): Promise<Chat> => {
      return await apiClient.getJson(`/go-event-flow/chats/${chatId}`);
    },
    enabled: !!chatId,
    staleTime: 1 * 60 * 1000, // 1 minute - chats are frequently updated
  });
};

// Mutations
export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (eventData: Record<string, unknown>) => {
      return await apiClient.postJson('/go-event-flow/events', eventData);
    },
    onSuccess: () => {
      // Invalidate and refetch events
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
    },
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ eventId, comment }: { eventId: string; comment: string }) => {
      return await apiClient.postJson(`/go-event-flow/events/${eventId}/comment`, comment);
    },
    onSuccess: (data, variables) => {
      // Invalidate event details to refresh comments
      queryClient.invalidateQueries({ queryKey: queryKeys.eventDetails(variables.eventId) });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ eventId }: { eventId: string }) => {
      return await apiClient.delete(`/go-event-flow/events/${eventId}`);
    },
    onSuccess: () => {
      // Invalidate events list
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, profileData }: { userId: string; profileData: Record<string, unknown> }) => {
      return await apiClient.putJson(`/go-event-flow/users/${userId}`, profileData);
    },
    onSuccess: (_, variables) => {
      // Invalidate user data
      queryClient.invalidateQueries({ queryKey: queryKeys.user(variables.userId) });
    },
  });
};

// Authentication Mutations
export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      return await publicApiClient.postJson('/go-event-flow/auth/login', { email, password });
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      repeatPassword: string;
    }) => {
      return await publicApiClient.postJson('/go-event-flow/auth/register', userData);
    },
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: async (refreshToken: string) => {
      return await publicApiClient.postJson('/go-event-flow/auth/refresh', { refreshToken });
    },
  });
};

// Chat Mutations
export const useCreateChat = () => {
  return useMutation({
    mutationFn: async (userId: string) => {
      return await apiClient.postJson(`/go-event-flow/chats/new/${userId}`);
    },
  });
};

// External API Mutations (Cloudinary)
export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (file: File): Promise<{ secure_url: string }> => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string);
      formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY as string);

      const response = await fetch('https://api.cloudinary.com/v1_1/dqi8wlcrp/image/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      return response.json();
    },
  });
};

// Location-based hook (keeping axios for external Radar API)
import axios from 'axios';

export const useReverseGeocode = (latLng: LatLngExpression) => {
  return useQuery({
    queryKey: ['geocode', latLng],
    queryFn: async () => {
      const options = {
        method: 'GET',
        url: `https://api.radar.io/v1/geocode/reverse?coordinates=${latLng}&layers=address`,
        headers: {
          'Authorization': import.meta.env.VITE_RADAR_API_KEY as string,
        },
      };

      const response = await axios.request(options);
      return response.data;
    },
    enabled: !!latLng,
    staleTime: 10 * 60 * 1000, // 10 minutes - location data doesn't change often
  });
};
