import React from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function CustomSnackbar({...props}){
    const handleSnackbarClose = (setClose, event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setClose(false);
    };

    return (
        <Snackbar   open={props.open} 
                    autoHideDuration={5000} 
                    onClose={() => handleSnackbarClose(props.onClose)} >
            <Alert  onClose={() => handleSnackbarClose(props.onClose)} 
                    severity={props.severity} 
                    sx={{ width: '100%', zIndex: 110 }} >
                {props.children}
            </Alert>
        </Snackbar>
    )
}