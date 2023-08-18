import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Container';
import { CustomButton } from '../../ui/button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';


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
        <CustomButton   sx={{ width: '100%',
                        backgroundColor: '#191970',
                        '&:hover': {
                            backgroundColor: '#00004e',
                        } }} 
                        variant="contained" 
                        size="large" 
                        onClick={handleClickOpen}>
            ¿Cómo funciona Pet Finder?
        </CustomButton>
        <BootstrapDialog
        //   onClick={handleClose}
        //   aria-labelledby="customized-dialog-title"
          open={open}
        >
            <Box sx={{ 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingRight: 0,
                padding: 2,
                backgroundColor: '#212121',
                color: 'white'
                }}>
                <Typography sx={{ m: 0 }} variant="h1" gutterBottom>
                    Pet Finder App
                </Typography>
                <CustomButton sx={{ 
                    fontSize: 22,
                    color: "inherit"
                    }} onClick={handleClose}>X</CustomButton>
            </Box>
          <DialogContent dividers sx={{ backgroundColor: '#212121',
                                        color: 'white'}}>
            <Typography gutterBottom>
            Una vez aceptes dar tu ubicación, "Pet Finder" iniciará una busqueda de mascotas reportadas como perdidas dentro de tu zona. O bien puedes iniciar sesión o registrarte para reportar una mascota como perdida.
            </Typography>
          </DialogContent>
        </BootstrapDialog>
      </div>
    );
  }