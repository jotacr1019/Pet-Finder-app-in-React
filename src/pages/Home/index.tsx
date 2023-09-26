import React, { Suspense } from 'react';
import { Container, ThemeProvider, Typography, CircularProgress } from '@mui/material';
import { HomeDisplay } from '../../components/homeDisplay';
import { HomeTheme } from './themes';

export function Home(){
    return  <ThemeProvider theme={HomeTheme}>
                <Container disableGutters={true} className='homeContainer'>
                    <Suspense fallback={<Loading />}>
                        <Typography variant='h2' className='title' >
                            Mascotas Perdidas cerca de tu ubicación
                        </Typography>
                        <HomeDisplay />
                    </Suspense>
                </Container>
            </ThemeProvider>
}

function Loading(){
    return  <CircularProgress size={60} sx={{color: '#191970'}} />
}