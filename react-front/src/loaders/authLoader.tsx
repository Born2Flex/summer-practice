// src/loaders/authLoader.ts
import { redirect } from 'react-router-dom';
import { getToken } from '../auth.tsx';

export function requireAuth(): null | Response {
  const token = getToken();
  if (!token) {
    return redirect('/login');
  }
  return null; // No redirection means access is granted
}
