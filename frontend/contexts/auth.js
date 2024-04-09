"use client";

import axiosInstance, { setBearerToken } from "@/utils/axios.instance";
import React, { useState, useContext, createContext } from "react";

const authContext = createContext({});

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(undefined);
  const [error, setError] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);

  const signIn = async (email, password) => {
    setError(false);
    setIsUserLogged(false);

    try {
      const response = await axiosInstance.post("users/login", {
        email,
        password,
      });

      setUser(response.data.data);
      setBearerToken(response.data.data.token);
      setIsUserLogged(true);
    } catch (error) {
      setError(true);
    }
  };

  const signOut = async () => {
    setError(false);

    try {
      await axiosInstance.patch("users/logout");

      setUser(undefined);
      setIsUserLogged(false);
      setBearerToken("");

      window.location = "/";
    } catch (error) {
      setError(true);
    }
  };

  return { isUserLogged, error, user, signIn, signOut };
}

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export default ProvideAuth;
