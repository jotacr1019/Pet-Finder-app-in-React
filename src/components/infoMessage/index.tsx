import React, { useState } from 'react';
import DialogContent from '@mui/material/DialogContent';
import { Container, ThemeProvider, Typography } from '@mui/material';
import { CustomButton } from '../../ui/button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { infoMessageTheme } from './themes';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


export function InfoMessage() {
    const [infoMessageOpen, setInfoMessageOpen] = useState(false);

    const handleClickOpen = () => {
        setInfoMessageOpen(true);
    };
    const handleClose = () => {
        setInfoMessageOpen(false);
    };

    return (
        <ThemeProvider theme={infoMessageTheme}>
            <Container disableGutters={true} className='infoMessageContainer'>
                <CustomButton 
                            variant="contained"
                            className="infoMessageButton"
                            size="large" 
                            onClick={handleClickOpen}>
                    ¿Cómo funciona Pet Finder?
                </CustomButton>
                <BootstrapDialog
                            open={infoMessageOpen}
                            sx={{
                                m: {sm: 'auto'},
                            }} >
                    <Container className='secondaryContainer' >
                        <Typography
                                variant="h4"
                                className="title"
                                gutterBottom >
                            Pet Finder App
                        </Typography>
                        <CustomButton 
                                    onClick={handleClose}
                                    variant="text"
                                    className="closeButton" >
                            X
                        </CustomButton>
                    </Container>
                    <DialogContent 
                                dividers 
                                className="dialogContent">
                        <Typography variant="body1"
                                    className="text"
                                    gutterBottom >
                            Una vez aceptes dar tu ubicación, "Pet Finder" iniciará una busqueda de mascotas reportadas como perdidas dentro de tu zona. O bien puedes iniciar sesión o registrarte para reportar una mascota como perdida.
                        </Typography>
                    </DialogContent>
                </BootstrapDialog>
            </Container>
        </ThemeProvider>
    );
}