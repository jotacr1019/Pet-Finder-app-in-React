import React from "react";
import { Box, Typography } from '@mui/material';
import { MenuDisplay } from '../../components/menuDisplay';


export function Menu(){
    return <Box sx={{ display: 'flex',
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
                {/* <Box sx={{
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
                                height: { xs: '242px', sm: '242px', md: 'auto' },
                                display: {xs: 'none'},
                            }} 
                            src="../../src/assets/Petf2.jpg" 
                            alt="dogImage"
                    />
                </Box> */}
                {/* <Box sx={{width: '100%', height: '100%'}}>
                </Box> */}
                <Typography sx={{   fontSize: {xs: '2rem', sm: '3rem', md: '4.5rem', lg: '5.2rem'},
                                    textAlign: 'center',
                                    color: '#d1466c',
                                    // boxShadow: 'rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset'
                                }} >
                    Datos Personales
                </Typography>
                <MenuDisplay /> 
            </Box>
}