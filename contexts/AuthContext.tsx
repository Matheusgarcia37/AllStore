import { createContext, useEffect, useState } from "react";
import api from "../api/api";
import Router from 'next/router';

type FormLogin = {
    username: string;
    password: string;
}

type FormLoginClient = {
    username: string;
    password: string;
    storeId: string;
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
    signInClient: (data: FormLoginClient) => Promise<void>;
    userClient: User | null;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: any }) {
    const [user, setUser] = useState<User | null>(null);
    const [userClient, setUserClient] = useState<User | null>(null);
    const isAuthenticated = !!user;

    useEffect(() => {
        async function loadUser() {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const res = await api.post("/user/getUserByToken", { token })
                    console.log(res.data);
                    if(res.data.typeOfUser === "user"){
                        setUserClient(res.data);
                    } else if(res.data.typeOfUser === "admin"){
                        setUser(res.data);
                    } else {
                        setUser(null);
                    }
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

    async function signInClient({ username, password, storeId }: FormLoginClient) {
        const { data } = await api.post('/user/authClient',
            {
                username,
                password,
                storeId
            });
        console.log(data);
        const { token } = data;
        localStorage.setItem("token", token);
        setUserClient(data.user);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        //Router.push('/');
    }

    async function logout() {
        localStorage.removeItem("token");
        if(user){
            setUser(null);
            Router.push('/');
        } else if(userClient){
            const storeName = userClient?.Store?.name;
            setUserClient(null);
            Router.push(`/${storeName}`);
        }
    }

    return (
        <AuthContext.Provider value={{ user, userClient, isAuthenticated, signIn, signInClient, logout }}>
            {children}
        </AuthContext.Provider>
    )
}