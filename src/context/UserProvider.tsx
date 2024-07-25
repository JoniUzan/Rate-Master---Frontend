import { toast } from "@/components/ui/use-toast";
import { api } from "../lib/utils";

import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

//Logged in user type
export interface User {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;

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
  firstName: string;
  lastName: string;
}

export interface AuthContextType {
  loggedInUser: User | null | undefined;
  userLikes: string[] | null | undefined;
  setUserLikes: React.Dispatch<React.SetStateAction<string[]>>
  login: (userData: LoginCredentials) => Promise<void>;
  register: (userData: RegisterCredentials) => Promise<void>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null | undefined>(
    undefined
  );
  const [userLikes, setUserLikes] = useState<string[]>([])


  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    // if (!token) {
    //   setLoggedInUser(null);
    //   console.log("User is not logged in")
    //   return;
    // }

    async function fetchUser() {
      try {
        const response = await api.get("/auth/loggedInUser");
        setLoggedInUser(response.data.user);
        setUserLikes(response.data.likedReviews);
        console.log("likes :", response.data.likedReviews);
        console.log("user :", response.data.user);
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
    localStorage.removeItem("token");
    setLoggedInUser(null);
  }

  async function login(userData: LoginCredentials) {
    try {
      const response = await api.post("/auth/login", userData);
      console.log(response.data.token);
      localStorage.setItem("token", `${response.data.token}`);
      console.log("loged in successfully");
      navigate("/");
    } catch (error) {
      toast({
        description: "Error logged in",
        variant: "destructive",
      });
      console.error("Error logging in:", error);
    }
  }

  async function register(userData: RegisterCredentials) {
    try {
      await api.post("/auth/register", userData);
      toast({
        description: "Signed up successfully",
        style: {
          backgroundColor: "lightgreen",
        },
      });
      console.log("registered successfully");
      navigate("/auth/SignIn");
    } catch (error) {
      toast({
        description: "Error signing up",
        variant: "destructive",
      });
      console.error("Error registering:", error);
    }
  }

  return (
    <AuthContext.Provider value={{ loggedInUser, userLikes, login, register, logout, setUserLikes }}>
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
