import { api } from "../lib/utils";
import { useLocalStorage } from "@uidotdev/usehooks";

import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

//Logged in user type
export interface User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  tasks: string[];
  image?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
export interface RegisterCredentials {
  username: string;
  password: string;
  email: string;
}

export interface AuthContextType {
  loggedInUser: User | null | undefined;
  login: (userData: LoginCredentials) => Promise<void>;
  register: (userData: RegisterCredentials) => Promise<void>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null | undefined>(
    undefined
  );
  const [token, setToken] = useLocalStorage("jwt-taskify", null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setLoggedInUser(null);
      return;
    }

    async function fetchUser() {
      try {
        const response = await api.get("/auth/loggedInUser");
        setLoggedInUser(response.data);
        console.log(response.data);
      } catch (error: any) {
        if (error.response?.status === 401) {
          console.error("Invalid token, logging out");
          logout();
        } else if (error.response?.status === 404) {
          console.error("User not found, logging out");
          logout();
        } else {
          console.error("Error fetching user data:", error);
        }
      }
    }

    fetchUser();
  }, [token]);

  function logout() {
    setToken(null);
    setLoggedInUser(null);
  }

  async function login(userData: LoginCredentials) {
    try {
      const response = await api.post("/auth/login", userData);
      setToken(response.data.token);
      console.log("loged in successfully");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

  async function register(userData: RegisterCredentials) {
    try {
      await api.post("/auth/register", userData);
      console.log("registered successfully");
      navigate("/auth/login");
    } catch (error) {
      console.error("Error registering:", error);
    }
  }

  return (
    <AuthContext.Provider value={{ loggedInUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
}
