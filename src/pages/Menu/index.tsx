import React from "react";
import { Box, Typography } from '@mui/material';
import { MenuDisplay } from '../../components/menuDisplay';


export function Menu(){
    return  <Box    sx={{ display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        height: {xs: '92.4vh', sm: '90.4vh' , md: '90.4vh'}, 
                        width: '100%',
                        minWidth: '375px',
                        padding: {xs: '25px 35px', sm: '30px 100px' , md: '30px 120px', lg: '30px 195px'},
                        backgroundImage: {xs: 'url(../../src/assets/Petf7.jpg)'},
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover'
                        // backgroundColor: '#4267ac'
                    }}>
                <Typography variant="h2"
                            sx={{   
                                fontSize: {xs: '2rem', sm: '3rem', md: '4.5rem', lg: '5.2rem'},
                                textAlign: 'center',
                                color: '#d1466c'
                            }} >
                    Datos Personales
                </Typography>
                <MenuDisplay /> 
            </Box>
}