import React, { useState, useEffect } from 'react';
import { Container, Box, ThemeProvider, Typography, List, ListItem, Button } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import { usePetsFound } from "../../hooks/petsAround";
import { homeCardTheme } from './themes';
import css from './index.module.css';


export function HomeCards() {
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
                                        {pet.imageUrl.map((url, index) => (
                                            <Box    component="img" 
                                                    key={index}
                                                    src={url}
                                                    alt={pet.name}
                                                    className={ pet.imageUrl.length < 2 ? css.imageStatic : '' } >
                                            </Box>
                                        ))}
                                    </Container>
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