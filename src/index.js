import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { msalConfig } from './authConfig';
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
/**
 * MSAL should be instantiated outside of the component tree to prevent it from being re-instantiated on re-renders.
 * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
export const msalInstance = new PublicClientApplication(msalConfig);

// Default to using the first account if no account is active on page load
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

// Optional - This will update account state if a user signs in from another tab or window
msalInstance.enableAccountStorageEvents();


msalInstance.addEventCallback((event) => {
    console.log(event.eventType);
    if (
        (event.eventType === EventType.LOGIN_SUCCESS ||
            event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
            event.eventType === EventType.SSO_SILENT_SUCCESS) &&
        event.payload.account
    ) {
        msalInstance.setActiveAccount(event.payload.account);
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>  
      <App />
    </MsalProvider>
  </React.StrictMode>
);