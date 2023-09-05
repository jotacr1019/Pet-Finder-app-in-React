import React from "react";
import { Container, Typography, ThemeProvider } from '@mui/material';
import { MenuDisplay } from '../../components/menuDisplay';
import { menuTheme } from './themes';


export function Menu(){
    return  <ThemeProvider theme={menuTheme}>
                <Container disableGutters={true} className="principalContainer" >
                    <Typography variant="h2" className="title" >
                        Datos Personales
                    </Typography>
                    <MenuDisplay /> 
                </Container>
            </ThemeProvider>
}