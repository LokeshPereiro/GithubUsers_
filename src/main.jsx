import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { GithubUsersContextProvider } from "./context";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_APP_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_APP_AUTH0_CLIENTID}
      cacheLocation="localstorage"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <GithubUsersContextProvider>
        <App />
      </GithubUsersContextProvider>
    </Auth0Provider>
  </React.StrictMode>
);
