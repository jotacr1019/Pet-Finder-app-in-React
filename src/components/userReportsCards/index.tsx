import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Container, 
    ThemeProvider,
    Box,
    Typography,
    Button } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import { userReportsCardTheme } from './themes';


export function UserReportsCard({...props}) {
    return (
        <ThemeProvider theme={userReportsCardTheme}>
            <Container disableGutters={true} className="card">
                <Container disableGutters={true} className="cardDetails">
                    <Container disableGutters={true} className="titleContainer">
                        <PetsIcon />
                        <Typography variant="h4" className="textTitle">
                            {props.pet.name}
                        </Typography>
                    </Container>
                    <Container disableGutters={true} className="cardImageStaticContainer" >
                            <Box    component="img"
                                    src={props.pet.imageUrl[0]}
                                    alt={props.pet.name}
                                    sx={{
                                        width: '100%',
                                        maxHeight: {xs: 222, sm: 250, md: 270, lg: 280},
                                        height: 'fit-content',
                                    }} >
                            </Box>
                    </Container>
                    <Typography variant="body1" className="textBody">
                        {props.pet.location}
                    </Typography>
                </Container>
                <Link to={`/edit-report/petId-${props.pet.id}`} >
                    <Button className="cardButton"
                            variant="contained" >
                        Editar
                    </Button>
                </Link>
            </Container>
        </ThemeProvider>
    )
}