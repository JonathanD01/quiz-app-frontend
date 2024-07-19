import { jwtDecode } from "jwt-decode";
import { createContext, useLayoutEffect, useMemo, useState } from "react";

export const AuthContext = createContext(null);

const isTokenExpired = (token) => {
  if (!token) return true;
  const decodedToken = jwtDecode(token);
  return Date.now() >= decodedToken.exp * 1000;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const isAuthenticated = () => {
    return token !== null && !isTokenExpired(token);
  };

  useLayoutEffect(() => {
    if (!token || isTokenExpired(token)) {
      logout();
      console.log("need to be logged in");
      return;
    }

    const decodedUser = jwtDecode(token);
    setUser(decodedUser);
  }, [token]);

  const login = (tokenToDecode) => {
    try {
      const decodedUser = jwtDecode(tokenToDecode);
      setUser(decodedUser);
      setToken(tokenToDecode);
      window.localStorage.setItem("token", tokenToDecode);
    } catch (error) {
      console.error("Failed to decode token on login:", error);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  const authContextValue = useMemo(
    () => ({
      user,
      login,
      token,
      isAuthenticated,
      logout,
    }),
    [user, token]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
