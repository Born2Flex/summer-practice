// Description: This file contains functions to handle the authentication of the user 
export function setAccessToken(accessToken: string): void {
    localStorage.setItem('accessToken', accessToken);
}

export function setRefreshToken(refreshToken: string): void {
    localStorage.setItem('refreshToken', refreshToken);
}

export function setUserId(userId: string): void {
    localStorage.setItem('userId', userId);
}

export function getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
}

export function getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
}

export function getUserId(): string | null {
    return localStorage.getItem('userId');
}

export function clearAccessToken(): void {
    localStorage.removeItem('accessToken');
}

export function clearRefreshToken(): void {
    localStorage.removeItem('refreshToken');
}

export function clearUserId(): void {
    localStorage.removeItem('userId');
}

export function clearAllAuth(): void {
    clearAccessToken();
    clearRefreshToken();
    clearUserId();
}
