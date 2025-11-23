import { loaderApiClient } from './apiClient';

/**
 * Guards a loader by ensuring the user is authenticated before proceeding.
 * Makes a lightweight request to verify the access token is valid.
 * If authentication fails, loaderApiClient will throw a redirect response.
 */
export async function requireAuth(): Promise<void> {
    try {
        await loaderApiClient.get('/go-event-flow/events/types');
    } catch (error) {
        if (error instanceof Response) {
            throw error;
        }
        throw error;
    }
}

