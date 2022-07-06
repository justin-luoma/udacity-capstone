import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Auth0Provider} from "@auth0/auth0-react";
import {authConfig} from "./config";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Auth0Provider
              clientId={authConfig.clientId}
              domain={authConfig.domain}
              redirectUri={authConfig.callbackUrl}
              audience={authConfig.audience}
              useRefreshTokens={true}
              cacheLocation="localstorage"
          >
              <App key="app" />
          </Auth0Provider>
      </BrowserRouter>
  </React.StrictMode>
);


if (module.hot) {
    module.hot.accept();
}
