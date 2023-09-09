import React, { useState, useEffect } from 'react';
import { Container, Box, ThemeProvider, Typography, List, ListItem, Button } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import { usePetsFound } from "../../hooks/petsAround";
import { homeCardTheme } from './themes';
import css from './index.module.css';


export function HomeCards2() {
    const [petsFound] = usePetsFound();

    const [imageClassName, setImageClassName] = useState('cardImageStaticContainer');

    return (
        <ThemeProvider theme={homeCardTheme}>
            <Container disableGutters={true} className="homeCardContainer">
                <List className="listCard">
                    {petsFound?.map((pet, index) => (
                        <ListItem className='listItem' disablePadding key={index}>
                            <Container disableGutters={true} className="card">
                                <Container disableGutters={true} className="cardDetails">
                                    <Container disableGutters={true} className="titleContainer">
                                        <PetsIcon />
                                        <Typography variant="h4" className="textTitle">
                                            {pet.name}
                                        </Typography>
                                    </Container>
                                    <Container disableGutters={true} className={pet.imageUrl.length < 2 ? imageClassName : pet.imageUrl.length === 2 ? css.containerOfTwoImages : pet.imageUrl.length === 3 ? css.containerOfThreeImages : css.containerOfFourImages } >
                                        {/* <Container disableGutters={true} 
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        width: '100%',
                                                        height: '100%',
                                                        border: '1px solid green',
                                                    }}> */}
                                        {pet.imageUrl.map((url, index) => (
                                                <Box    component="img" 
                                                        key={index}
                                                        src={url}
                                                        alt={pet.name}
                                                        className={ pet.imageUrl.length < 2 ? css.imageStatic : '' }
                                                        // className="cardImage"
                                                        // sx={{ 
                                                        //     width: '100%', 
                                                        //     maxHeight: { xs: "230px", sm: "250px", md: "270px", lg: "280px" },
                                                        //     height: 'fit-content',
                                                        // }}
                                                        // sx={{ display: 'block', width: '100%' }}
                                                        >
                                                </Box>
                                        ))}
                                        {/* </Container> */}
                                    </Container>
                                    {/* <Container disableGutters={true} className="cardImageContainer">
                                        <Box    component="img" 
                                                src={pet.imageUrl[0]}
                                                alt={pet.name}
                                                sx={{ 
                                                    width: '100%', 
                                                    maxHeight: { xs: "230px", sm: "250px", md: "270px", lg: "280px" },
                                                    height: 'fit-content',
                                                }}>
                                        </Box>
                                    </Container> */}
                                    <Typography variant="body1" className="textBody">
                                        {pet.location}
                                    </Typography>
                                </Container>
                                <Button className="cardButton" variant="contained">
                                    Reportar
                                </Button>
                            </Container>
                        </ListItem>
                    ))}
                </List>
            </Container>
        </ThemeProvider>
    )
}