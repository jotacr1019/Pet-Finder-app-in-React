import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Container, Box, ThemeProvider, Typography, List, ListItem, Button, Skeleton } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import { useGetPetsOfUser } from "../../hooks/petsOfUser";
import { userReportsCardsTheme } from './themes';
import css from './index.module.css';


export function UserReportsCards() {
    const { getPetsOfUser } = useGetPetsOfUser();

    const [petsFound, setPetsFound] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getPetsOfUser().then((petsFound) => {
            setPetsFound(petsFound);
        });
    }, []);

    useEffect(() => {
        console.log({petsFound});
    }, [petsFound]);

    // const handleEditClick = (petId) => {
    //     navigate(`/edit-report/petId-${petId}`)
    // }

    // const [petsFound, setPetsFound] = useState([]);

    // const [imageClassName, setImageClassName] = useState('cardImageStaticContainer');

    return (
        <ThemeProvider theme={userReportsCardsTheme}>
            <Container disableGutters={true} className="homeCardContainer">
                <List className="listCard">
                    {petsFound.length > 0
                    ? (petsFound.map((pet, index) => (
                        <ListItem className='listItem' disablePadding key={pet.id}>
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
                                                    }}
                                                    >
                                            </Box>
                                    </Container>
                                    <Typography variant="body1" className="textBody">
                                        {pet.location}
                                    </Typography>
                                </Container>
                                <Link to={`/edit-report/petId-${pet.id}`} >
                                    <Button className="cardButton" 
                                            // onClick={()=>{handleEditClick(pet.id)}}
                                            variant="contained">
                                        Editar
                                    </Button>
                                </Link>
                            </Container>
                        </ListItem>
                    )))
                    : (<List className="listCard" >
                        <Container disableGutters={true} className="skeletonContainer" >
                            <Skeleton variant="text" className="skeletonText1" />
                            <Skeleton variant="rectangular" className="skeletonRectangular" />
                            <Skeleton variant="text" className="skeletonText2" />
                        </Container>
                        <Container disableGutters={true} className="skeletonContainer" >
                            <Skeleton variant="text" className="skeletonText1" />
                            <Skeleton variant="rectangular" className="skeletonRectangular" />
                            <Skeleton variant="text" className="skeletonText2" />
                        </Container>
                        <Container disableGutters={true} className="skeletonContainer" >
                            <Skeleton variant="text" className="skeletonText1" />
                            <Skeleton variant="rectangular" className="skeletonRectangular" />
                            <Skeleton variant="text" className="skeletonText2" />
                        </Container>
                    </List>)
                    }
                </List>
            </Container>
        </ThemeProvider>
    )
}