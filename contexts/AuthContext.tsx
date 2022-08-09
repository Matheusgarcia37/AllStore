import { createContext, useEffect, useState } from "react";
import api from "../api/api";
import Router from 'next/router';

type FormLogin = {
    username: string;
    password: string;
}
type User = {
    id: string;
    username: string;
} | any;
type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    signIn: (data: FormLogin) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: any }) {
    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;

    useEffect(() => {
        async function loadUser() {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const res = await api.post("/user/getUserByToken", { token })
                    console.log(res.data);
                    setUser(res.data);
                } catch (error) {
                    localStorage.removeItem("token");
                    setUser(null);
                }
            }
        }
        loadUser();
    }, []);

    async function signIn({ username, password }: FormLogin) {
        const { data } = await api.post('/user/auth',
            {
                username,
                password
            });
        console.log(data);
        const { token } = data;
        localStorage.setItem("token", token);
        setUser(data.user);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        Router.push('/admin');
        
    }

    async function logout() {
        localStorage.removeItem("token");
        setUser(null);
        Router.push('/');
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, logout }}>
            {children}
        </AuthContext.Provider>
    )
}