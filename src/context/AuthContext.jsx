import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("intoracUser");

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem("intoracToken");
    });

    const login = (userData, userToken) => {
        localStorage.setItem(
            "intoracUser",
            JSON.stringify(userData)
        );

        localStorage.setItem(
            "intoracToken",
            userToken
        );

        setUser(userData);
        setToken(userToken);
    };

    const logout = () => {
        localStorage.removeItem("intoracUser");
        localStorage.removeItem("intoracToken");

        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};