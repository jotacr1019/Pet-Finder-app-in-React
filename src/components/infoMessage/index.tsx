import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Container';
import { CustomButton } from '../../ui/button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


export function InfoMessage() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <CustomButton   
                        sx={{ width: '100%',
                            backgroundColor: '#191970',
                            '&:hover': {
                                backgroundColor: '#00004e',
                            } 
                        }} 
                        variant="contained" 
                        size="large" 
                        onClick={handleClickOpen}>
                ¿Cómo funciona Pet Finder?
            </CustomButton>
            <BootstrapDialog
                        open={open}
                        sx={{
                            m: {sm: 'auto'},
                        }} >
                <Box sx={{ 
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: 2,
                        paddingRight: {xs: '0', sm: '0', md: '0', lg: '0'},
                        backgroundColor: '#212121',
                        color: 'white'
                    }}>
                    <Typography sx={{ 
                                    m: 0,
                                    fontSize: { xs: '1.4rem', sm: '1.5rem', md: '1.9rem', lg: '2.2rem' },
                                }} 
                                variant="h1" 
                                gutterBottom>
                        Pet Finder App
                    </Typography>
                    <CustomButton 
                                onClick={handleClose}
                                sx={{ 
                                    fontSize: { xs: 16, sm: 18, md: 20, lg: 22 },
                                    color: "inherit"
                                }} >
                        X
                    </CustomButton>
                </Box>
                <DialogContent 
                            dividers 
                            sx={{ 
                                backgroundColor: '#212121',
                                color: 'white',
                            }} >
                    <Typography gutterBottom
                                sx={{
                                    fontSize: { md: '1.2rem', lg: '1.4rem' }
                                }} >
                        Una vez aceptes dar tu ubicación, "Pet Finder" iniciará una busqueda de mascotas reportadas como perdidas dentro de tu zona. O bien puedes iniciar sesión o registrarte para reportar una mascota como perdida.
                    </Typography>
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}