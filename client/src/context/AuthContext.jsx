import { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, signup as apiSignup } from '../api/auth';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log('Decoded token:', decoded);
                setUser({
                    token,
                    id: decoded?.uuid || decoded?.sub || decoded?.id,
                    email: decoded?.email || decoded?.sub,
                });
            } catch (error) {
                console.error('Invalid token in localStorage', error);
                localStorage.removeItem("token");
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const token = await apiLogin(email, password);
        if (token) {
            const decoded = jwtDecode(token);
            console.log('Raw token:', token);
            console.log('Login decoded token:', decoded);
            console.log('UUID from token:', decoded.uuid);
            const userData = {
                token,
                id: decoded.uuid,
                email: decoded.sub,
            };
            console.log('Setting user data:', userData);
            setUser(userData);
            return true;
        }
        return false;
    };

    const signup = async (email, password) => {
        const token = await apiSignup(email, password);
        if (token) {
            const decoded = jwtDecode(token);
            console.log('Signup decoded token:', decoded);
            setUser({
                token,
                id: decoded?.uuid || decoded?.sub || decoded?.id,
                email: decoded?.email || decoded?.sub,
            });
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    if (loading) {
        return <div>Loading...</div>; // or a spinner, splash screen, etc.
    }

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    )
}