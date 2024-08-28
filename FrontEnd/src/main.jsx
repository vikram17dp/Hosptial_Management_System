import { createContext, StrictMode, useState } from "react";
import ReactDOM  from "react-dom/client";
import App from "./App.jsx";
import React from "react";

export const Context = createContext({ isAuthenticated: false });

const Appwrapeer = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  return(
    
  <Context.Provider
    value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
  >
    <App />
  </Context.Provider>
  )
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Appwrapeer />
  </React.StrictMode>
);
