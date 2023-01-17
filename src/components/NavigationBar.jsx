import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { AppBar, Button, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { loginRequest, silentRequest } from '../authConfig';
import { SsoSilentPolling } from './SsoSilentPolling';

export const NavigationBar = () => {
    const { instance } = useMsal();
    let activeAccount;

    if (instance) {
        activeAccount = instance.getActiveAccount();
    }

    const handleLogin = () => {
        instance.loginRedirect(loginRequest).catch((error) => console.log(error));
    };

    const handleLogout = () => {
        console.log(activeAccount);
        instance.acquireTokenSilent(silentRequest).then(x=> instance.logoutRedirect({
            idTokenHint: x.idToken
        }));
         
    };

    return (
        <>
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Azure B2C session management sample
                </Typography>
                <UnauthenticatedTemplate>
                    <Button color="inherit" size="large" onClick={handleLogin}>Login</Button>
                </UnauthenticatedTemplate>
                <AuthenticatedTemplate>
                    <SsoSilentPolling/>
                    <Button color="inherit" size="large" onClick={handleLogout}>Logout</Button>
                </AuthenticatedTemplate>
            </Toolbar>
        </AppBar>
        <Toolbar />
        </>
    );
};
