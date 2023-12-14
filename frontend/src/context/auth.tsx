"use client";

import { useQuery } from "@tanstack/react-query";
import { type ReactNode, createContext, useContext, useMemo } from "react";
import { axiosClient } from "~/api/AxiosClient";
import type { Image } from "~/api/types";

type User = {
  display_name: string;
  email: string;
  country: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: null;
    total: number;
  };
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
};

type AuthContextValues = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues);

const useAuth = () => useContext(AuthContext);

const useMeQuery = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await axiosClient.get("/api/spotify/me/");
      return res.data as User;
    },
    refetchOnWindowFocus: false,
    staleTime: 60 * 60 * 1000,
  });
};

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const query = useMeQuery();

  const values = useMemo(() => {
    const user = query.data ?? null;
    const isAuthenticated = !!user;

    return {
      user: user,
      isAuthenticated: isAuthenticated,
      isLoading: query.isLoading,
    } satisfies AuthContextValues;
  }, [query]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider, useAuth };
