// src/auth.ts
export function setToken(token: string): void {
    localStorage.setItem('jwt', token);
}
  
export function getToken(): string | null {
    return localStorage.getItem('jwt');
}
  
export function clearToken(): void {
    localStorage.removeItem('jwt');
}
  