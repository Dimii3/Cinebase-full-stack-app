import React, { createContext, useState, useContext } from "react";
import API_CONFIG from "../api/config";

type User = {
  id: number;
  username: string;
  email: string;
  likedMovies: number[];
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  toggleLikeMovie: (movieId: number) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser({ ...userData, likedMovies: userData.likedMovies || [] });
  };

  const logout = () => {
    setUser(null);
  };

  const toggleLikeMovie = async (movieId: number) => {
    if (!user) return;

    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}/users/${user.id}/toggle-like`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ movieId }),
        }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to update likes");

      setUser({ ...user, likedMovies: data.likedMovies });
    } catch (error) {
      console.error("Toggle like error:", error);
    }
  };

  const value = {
    isAuthenticated: !!user,
    user,
    login,
    logout,
    toggleLikeMovie,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
