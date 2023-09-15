import React from 'react';
import { Link } from "react-router-dom";
import { Container, ThemeProvider, Box, Typography, Button } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import { userReportsCardTheme } from './themes';


export function UserReportsCard({pet}) {
    return (
        <ThemeProvider theme={userReportsCardTheme}>
            <Container disableGutters={true} className="card">
                <Container disableGutters={true} className="cardDetails">
                    <Container disableGutters={true} className="titleContainer">
                        <PetsIcon />
                        <Typography variant="h4" className="textTitle">
                            {pet.name}
                        </Typography>
                    </Container>
                    <Container disableGutters={true} className="cardImageStaticContainer" >
                            <Box    component="img"
                                    src={pet.imageUrl[0]}
                                    alt={pet.name}
                                    sx={{
                                        width: '100%',
                                        maxHeight: {xs: 222, sm: 250, md: 270, lg: 280},
                                        height: 'fit-content',
                                    }} >
                            </Box>
                    </Container>
                    <Typography variant="body1" className="textBody">
                        {pet.location}
                    </Typography>
                </Container>
                <Link to={`/edit-report/petId-${pet.id}`} >
                    <Button className="cardButton"
                            variant="contained" >
                        Editar
                    </Button>
                </Link>
            </Container>
        </ThemeProvider>
    )
}