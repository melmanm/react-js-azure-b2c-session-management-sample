import { Typography, Switch } from "@mui/material"
import React, { useEffect, useState } from "react"
import { silentRequest } from "../authConfig";
import { useMsal } from '@azure/msal-react';

export const SsoSilentPolling = () => {
    const pollingInterval = 5000; //ms
    const initialText = `/authorize polling (${pollingInterval/1000}s)`;
    const waitingText = "refreshing...";

    const { instance } = useMsal();
    const [checked, setChecked] = useState(false);
    const [text, setText] = useState(initialText);

    let activeAccount;

    if (instance) {
        activeAccount = instance.getActiveAccount();
    }

    const callSsoSilent = async () => {
        try {
            console.log("calling ssoSilent");
            setText(waitingText);
            await instance.ssoSilent(silentRequest);
            setText(initialText);

        } catch (e) {
            setChecked(false);
            instance.logoutRedirect({
                account: instance.getActiveAccount(),
                onRedirectNavigate: () => false
            });
        }
    }

    useEffect(() => {
        const intervalCall = checked && setInterval(callSsoSilent, pollingInterval);
        return () => {
            clearInterval(intervalCall);
        };
    }, [checked])

    return (
        activeAccount && <React.Fragment>
            <Typography component="label">
                {text}
            </Typography>
            <Switch
                onChange={(event) => { setChecked(event.target.checked);}}
                color="default"
                variant="solid"
            />
        </React.Fragment>


    )
} 