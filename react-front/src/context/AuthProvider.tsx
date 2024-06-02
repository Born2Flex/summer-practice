import { createContext, useContext, useState, ReactNode } from 'react';
import { getToken, clearToken } from '../auth'; // Ensure these functions are correctly imported

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children } : AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getToken());

    /*useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(!!localStorage.getItem('jwt'));
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);*/

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        clearToken();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

