import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';

export const ClaimsTable = () => {
    const { instance } = useMsal();

    let activeAccount;

    if (instance) {
        activeAccount = instance.getActiveAccount();
    }

    return (
        <center>
            <UnauthenticatedTemplate>
                <Typography variant="h6" sx={{ m: 1}}>Log in to see id_token claims</Typography>
            </UnauthenticatedTemplate>
            <AuthenticatedTemplate>
                <Typography variant="h6" sx={{ m: 2}}>You are logged in as {activeAccount?.name}. See id_token claims.</Typography>
                <TableContainer sx={{ width: '50%' }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontWeight:'bold'}}>Claim Name</TableCell>
                                <TableCell style={{fontWeight:'bold'}}>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {activeAccount && Object.keys(activeAccount.idTokenClaims).map((key, index) => (
                                <TableRow key={index}>
                                    <TableCell>{key}</TableCell>
                                    <TableCell>{activeAccount.idTokenClaims[key]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </AuthenticatedTemplate>
        </center>
    )
}