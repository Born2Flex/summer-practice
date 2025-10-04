import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken, setUserId, clearAllAuth } from '../auth';
import { AuthResponse } from '../context/AuthContext';

interface ApiClientConfig {
    onAuthError?: () => void;
}

class ApiClient {
    private baseURL: string;
    private isRefreshing: boolean = false;
    private failedQueue: Array<{
        resolve: (value: any) => void;
        reject: (error: any) => void;
    }> = [];
    private onAuthError?: () => void;

    constructor(baseURL?: string, config?: ApiClientConfig) {
        this.baseURL = baseURL || import.meta.env.VITE_API_URL || 'http://localhost:8080';
        this.onAuthError = config?.onAuthError;
    }

    private processQueue(error: any, token: string | null = null) {
        this.failedQueue.forEach(({ resolve, reject }) => {
            if (error) {
                reject(error);
            } else {
                resolve(token);
            }
        });
        
        this.failedQueue = [];
    }

    private async refreshToken(): Promise<boolean> {
        const refreshTokenValue = getRefreshToken();
        
        if (!refreshTokenValue) {
            return false;
        }

        try {
            const response = await fetch(`${this.baseURL}/go-event-flow/auth/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken: refreshTokenValue }),
            });

            if (response.ok) {
                const data: AuthResponse = await response.json();
                setAccessToken(data.accessToken);
                setRefreshToken(data.refreshToken);
                setUserId(data.userId);
                return true;
            } else {
                clearAllAuth();
                return false;
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            clearAllAuth();
            return false;
        }
    }

    private async makeRequest(url: string, options: RequestInit = {}): Promise<Response> {
        let accessToken = getAccessToken();
        
        if (!accessToken) {
            const refreshSuccess = await this.refreshToken();
            if (refreshSuccess) {
                accessToken = getAccessToken();
            } else {
                if (this.onAuthError) {
                    this.onAuthError();
                }
                throw new Error('Authentication required');
            }
        }
        
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${accessToken}`,
        };

        if (!options.headers || !('Content-Type' in options.headers)) {
            options.headers = {
                ...options.headers,
                'Content-Type': 'application/json',
            };
        }

        const response = await fetch(`${this.baseURL}${url}`, options);

        if (response.status === 401) {
            if (this.isRefreshing) {
                return new Promise((resolve, reject) => {
                    this.failedQueue.push({ resolve, reject });
                }).then((newAccessToken) => {
                    options.headers = {
                        ...options.headers,
                        'Authorization': `Bearer ${newAccessToken}`,
                    };
                    return fetch(`${this.baseURL}${url}`, options);
                });
            }

            this.isRefreshing = true;
            
            try {
                const refreshSuccess = await this.refreshToken();
                
                if (refreshSuccess) {
                    const newAccessToken = getAccessToken();
                    this.processQueue(null, newAccessToken);
                    
                    options.headers = {
                        ...options.headers,
                        'Authorization': `Bearer ${newAccessToken}`,
                    };
                    return await fetch(`${this.baseURL}${url}`, options);
                } else {
                    this.processQueue(new Error('Token refresh failed'), null);
                    if (this.onAuthError) {
                        this.onAuthError();
                    }
                    throw new Error('Authentication failed');
                }
            } catch (error) {
                this.processQueue(error, null);
                if (this.onAuthError) {
                    this.onAuthError();
                }
                throw error;
            } finally {
                this.isRefreshing = false;
            }
        }

        return response;
    }

    async get(url: string, options: RequestInit = {}): Promise<Response> {
        return this.makeRequest(url, { ...options, method: 'GET' });
    }

    async post(url: string, data?: any, options: RequestInit = {}): Promise<Response> {
        return this.makeRequest(url, {
            ...options,
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async put(url: string, data?: any, options: RequestInit = {}): Promise<Response> {
        return this.makeRequest(url, {
            ...options,
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async patch(url: string, data?: any, options: RequestInit = {}): Promise<Response> {
        return this.makeRequest(url, {
            ...options,
            method: 'PATCH',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async delete(url: string, options: RequestInit = {}): Promise<Response> {
        return this.makeRequest(url, { ...options, method: 'DELETE' });
    }

    async getJson<T>(url: string, options?: RequestInit): Promise<T> {
        const response = await this.get(url, options);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
    }

    async postJson<T>(url: string, data?: any, options?: RequestInit): Promise<T> {
        const response = await this.post(url, data, options);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
    }

    async putJson<T>(url: string, data?: any, options?: RequestInit): Promise<T> {
        const response = await this.put(url, data, options);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
    }

    async patchJson<T>(url: string, data?: any, options?: RequestInit): Promise<T> {
        const response = await this.patch(url, data, options);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
    }
}

export const apiClient = new ApiClient(undefined, {
    onAuthError: () => {
        console.warn('Authentication failed. Redirecting to login...');
    }
});

export const configureApiClient = (onAuthError: () => void) => {
    const client = new ApiClient(undefined, { onAuthError });
    return client;
};

export const loaderApiClient = new ApiClient(undefined, {
    onAuthError: () => {
        throw new Response(null, {
            status: 302,
            headers: {
                Location: '/login',
            },
        });
    }
});

export const publicApiClient = new ApiClient(undefined, {
    onAuthError: () => {
        console.warn('Public API error - this should not happen');
    }
});

publicApiClient['makeRequest'] = async function(url: string, options: RequestInit = {}): Promise<Response> {
    if (!options.headers || !('Content-Type' in options.headers)) {
        options.headers = {
            ...options.headers,
            'Content-Type': 'application/json',
        };
    }

    return await fetch(`${this.baseURL}${url}`, options);
};

export default ApiClient;
