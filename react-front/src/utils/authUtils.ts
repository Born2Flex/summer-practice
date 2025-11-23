import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken, setUserId, clearAllAuth } from '../auth';
import { publicApiClient } from './apiClient';

interface AuthResponse {
    userId: string;
    accessToken: string;
    refreshToken: string;
}

export async function ensureAuthenticated(): Promise<string | null> {
    const accessToken = getAccessToken();
    
    if (accessToken) {
        return accessToken;
    }
    
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        clearAllAuth();
        return null;
    }
    
    try {
        const data: AuthResponse = await publicApiClient.postJson('/go-event-flow/auth/refresh', { refreshToken });
        
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        setUserId(data.userId);
        
        return data.accessToken;
    } catch (error) {
        console.error('Error refreshing token:', error);
        clearAllAuth();
        return null;
    }
}


export function withAuth<T extends unknown[], R>(
    loaderFn: (token: string, ...args: T) => R | Promise<R>
) {
    return async (...args: T): Promise<R> => {
        const token = await ensureAuthenticated();
        
        if (!token) {
            throw new Response(null, {
                status: 302,
                headers: {
                    Location: '/login',
                },
            });
        }
        
        return loaderFn(token, ...args);
    };
}
