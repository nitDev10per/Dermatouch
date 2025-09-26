import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  API: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const API = "http://10.0.2.2:4000/api"; 

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const t = await AsyncStorage.getItem("token");
      if (t) setToken(t);
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await axios.post(`${API}/login`, { email, password });
    setToken(res.data.token);
    setUser(res.data.user);
    await AsyncStorage.setItem("token", res.data.token);
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, API, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
