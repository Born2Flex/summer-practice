// Description: This file contains functions to handle the authentication of the user 
// making use of the localStorage API to store the JWT token and user ID
export function setToken(token: string): void {
    localStorage.setItem('jwt', token);
}

export function setUserId(userId: string): void {
    localStorage.setItem('userId', userId);
}

export function getToken(): string | null {
    return localStorage.getItem('jwt');
}

export function getUserId(): string | null {
    return localStorage.getItem('userId');
}

export function clearToken(): void {
    localStorage.removeItem('jwt');
}

export function clearUserId(): void {
    localStorage.removeItem('userId');
}
