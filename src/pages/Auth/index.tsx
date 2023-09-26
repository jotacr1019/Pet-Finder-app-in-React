import React from 'react';
import { FormAuth } from '../../components/formAuth';
import { Container, ThemeProvider } from '@mui/material';
import { authTheme } from './themes';


export function Auth(){
    return  <ThemeProvider theme={authTheme}>
                <Container disableGutters={true} className='authContainer'>
                    <FormAuth />
                </Container>
            </ThemeProvider>
}