import React from "react";
import { Container, Typography, ThemeProvider } from '@mui/material';
import { MenuDisplay } from '../../components/menuDisplay';
import { menuTheme } from './themes';


export function Menu(){
    return  <ThemeProvider theme={menuTheme}>
                <Container maxWidth={false} disableGutters={true} className="menuContainer" >
                    <Typography variant="h2" className="title" >
                        Datos Personales
                    </Typography>
                    <MenuDisplay /> 
                </Container>
            </ThemeProvider>
}