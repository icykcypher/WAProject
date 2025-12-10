import { createContext, useContext, useEffect, useState } from "react";

interface SessionContextType {
    token: string | null;
    setToken: (token: string | null) => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
    const [token, setTokenState] = useState<string | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("eshop_token");
        if (saved) setTokenState(saved);
    }, []);

    const setToken = (token: string | null) => {
        if (token) localStorage.setItem("eshop_token", token);
        else localStorage.removeItem("eshop_token");
        setTokenState(token);
    };

    return (
        <SessionContext.Provider value={{ token, setToken }}>
            {children}
        </SessionContext.Provider>
    );
}

export function useSession() {
    const ctx = useContext(SessionContext);
    if (!ctx) throw new Error("useSession outside of provider");
    return ctx;
}
