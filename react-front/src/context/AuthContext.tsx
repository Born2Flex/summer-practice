import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getAccessToken, getRefreshToken, getUserId, setAccessToken, setRefreshToken, setUserId, clearAllAuth } from '../auth';
import { useLogin, useRegister, useRefreshToken } from '../hooks/useApiQueries';

export interface AuthContextType {
    isAuthenticated: boolean;
    userId: string | null;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    refreshToken: () => Promise<boolean>;
    isLoading: boolean;
}

export interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
}

export interface AuthResponse {
    userId: string;
    accessToken: string;
    refreshToken: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userId, setUserIdState] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const loginMutation = useLogin();
    const registerMutation = useRegister();
    const refreshTokenMutation = useRefreshToken();

    useEffect(() => {
        const accessToken = getAccessToken();
        const storedUserId = getUserId();
        
        if (accessToken && storedUserId) {
            setIsAuthenticated(true);
            setUserIdState(storedUserId);
        }
        setIsLoading(false);
    }, []);

    const refreshTokenFunc = useCallback(async (): Promise<boolean> => {
        const refreshTokenValue = getRefreshToken();
        
        if (!refreshTokenValue) {
            logout();
            return false;
        }

        try {
            const data: AuthResponse = await refreshTokenMutation.mutateAsync(refreshTokenValue);
            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);
            setUserId(data.userId);
            setIsAuthenticated(true);
            setUserIdState(data.userId);
            return true;
        } catch (error) {
            console.error('Error refreshing token:', error);
            logout();
            return false;
        }
    }, [refreshTokenMutation]);

    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        setIsLoading(true);
        try {
            const data: AuthResponse = await loginMutation.mutateAsync({ email, password });
            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);
            setUserId(data.userId);
            setIsAuthenticated(true);
            setUserIdState(data.userId);
            return { success: true };
        } catch (error: Error | unknown) {
            console.error('Login error:', error);
            const errorMessage = (error as Error).message?.includes('401') 
                ? 'Invalid email or password' 
                : 'Network error occurred';
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
        if (userData.password !== userData.repeatPassword) {
            return { success: false, error: 'Passwords do not match' };
        }

        setIsLoading(true);
        try {
            const data: AuthResponse = await registerMutation.mutateAsync(userData);
            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);
            setUserId(data.userId);
            setIsAuthenticated(true);
            setUserIdState(data.userId);
            return { success: true };
        } catch (error: Error | unknown) {
            console.error('Registration error:', error);
            const errorMessage = (error as Error).message || 'Registration failed';
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = useCallback(() => {
        clearAllAuth();
        setIsAuthenticated(false);
        setUserIdState(null);
    }, []);

    const value: AuthContextType = {
        isAuthenticated,
        userId,
        login,
        register,
        logout,
        refreshToken: refreshTokenFunc,
        isLoading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
