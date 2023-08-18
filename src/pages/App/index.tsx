import React from "react";
import css from "./app.module.css";
import { Box, Typography } from '@mui/material';
import { InfoMessage } from "../../components/infoMessage";
import { LocationData } from "../../components/locationData";



export function Welcome(){
    // return <div className={css.root}>
    return  <Box sx={{ display: {xs: 'grid', md: 'flex'}, 
                    width: '100%',
                    height: {xs: '92.4vh', sm: '90.4vh'},
                    padding: {xs: '20px', md: '16px'},
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#4267ac'
                    }}>
                <Box sx={{
                        display: {xs: 'flex', sm: 'flex'},
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%'
                        // width:'324px',
                        // height: '242px'
                }}>
                    <Box component='img' 
                            sx={{width:{ xs: '324px', sm: '324px', md: '100%' }, 
                                height: { xs: '242px', sm: '242px', md: 'auto' }}} 
                            src="../../src/assets/663shots_so.png" 
                            alt="dogs"/>
                </Box>
                <Box sx={{ width: '100%', 
                        display: 'flex',  
                        flexDirection: 'column', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        padding: { xs: '2px 16px', lg: '2px 16px 20px'},
                        gap: { xs:'14px', lg: '2px' } 
                        }}>
                    <Typography sx={{ textAlign: 'center',
                                    color: '#bdb76b',
                                    fontWeight: 'bold',
                                    marginBottom: { lg: '35px'},
                                    typography: { xs: {fontSize: '3rem'}, sm: {fontSize: '4rem'}, md: {fontSize: '5.5rem'} } 
                                    }} 
                                variant="h1" 
                                color="primary">
                        Pet Finder App
                    </Typography>
                    <Typography sx={{ typography: { xs: {fontSize: '1rem'}, sm: {fontSize: '1.2rem'}, md: {fontSize: '1.5rem'} },
                                    marginBottom: { xs: '28px', sm: '44px', md: '80px', lg: '130px' },
                                    textAlign: 'center',
                                    color: '#e0ffff' }}
                                variant='h4'>
                        Encontrá y reportá mascotas perdidas cerca de tu ubicación
                    </Typography>
                    <Box sx={{ display: 'flex',
                            flexDirection: 'column',
                            width: {xs: '95%', sm: '80%', lg: '65%'},
                            gap: '14px' }}>
                        <LocationData></LocationData>
                        <InfoMessage></InfoMessage>
                    </Box>
                </Box>
            </Box>
}