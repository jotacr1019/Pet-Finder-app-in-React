import React, { useState } from 'react';
import { Container, 
    ThemeProvider,
    Box,
    Typography,
    Button } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import { homeCardTheme } from './themes';
import css from './index.module.css';


export function HomeCard({...props}) {
    const {onChange} = props;

    const [imageClassName, setImageClassName] = useState('cardImageStaticContainer');

    const handleReportClick = (petData) => {
        if(onChange){
            onChange(petData);
        }
    }

    return (
        <ThemeProvider theme={homeCardTheme}>
            <Container disableGutters={true} className="card">
                <Container disableGutters={true} className="cardDetails">
                    <Container disableGutters={true} className="titleContainer">
                        <PetsIcon />
                        <Typography variant="h4" className="cardTitle">
                            {props.pet.name}
                        </Typography>
                    </Container>
                    <Container disableGutters={true} className={props.pet.imageUrl.length < 2 ? imageClassName : props.pet.imageUrl.length === 2 ? css.containerOfTwoImages : props.pet.imageUrl.length === 3 ? css.containerOfThreeImages : css.containerOfFourImages } >
                        {props.pet.imageUrl.map((url, index) => (
                            <Box    component="img" 
                                    key={index}
                                    src={url}
                                    alt={props.pet.name}
                                    className={ props.pet.imageUrl.length < 2 ? css.imageStatic : '' } >
                            </Box>
                        ))}
                    </Container>
                    <Typography variant="body1" className="cardText">
                        {props.pet.location}
                    </Typography>
                </Container>
                <Button className="cardButton" 
                        variant="contained"
                        onClick={() => handleReportClick(props.pet)} >
                    Reportar
                </Button>
            </Container>
        </ThemeProvider>
    )
}