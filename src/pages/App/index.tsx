import React from 'react';
import { Box, Typography, Container, ThemeProvider } from '@mui/material';
import { InfoMessage } from '../../components/infoMessage';
import { LocationData } from '../../components/locationData';
import { appTheme } from './themes';



export function Welcome(){
    return (  
        <ThemeProvider theme={appTheme}>
            <Container disableGutters={true} className='appContainer' >
                <Container disableGutters={true} className='imageContainer' >
                    <Box    component='img' 
                            sx={{
                                width:{ xs: '324px', sm: '324px', md: '100%' }, 
                                height: { xs: '242px', sm: '242px', md: 'auto' }
                            }} 
                            src='../../src/assets/663shots_so.png' 
                            alt='dogsPicture'
                    />
                </Container>
                <Container disableGutters={true} className='titleAndButtonsContainer' >
                    <Typography className='title' variant='h1' color='primary' >
                        Pet Finder App
                    </Typography>
                    <Typography className='subtitle' variant='h4'>
                        Encontrá y reportá mascotas perdidas cerca de tu ubicación
                    </Typography>
                    <Container disableGutters={true} className='buttonsContainer' >
                        <LocationData></LocationData>
                        <InfoMessage></InfoMessage>
                    </Container>
                </Container>
            </Container>
        </ThemeProvider> )
}