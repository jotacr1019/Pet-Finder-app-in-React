import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, ThemeProvider, List, ListItem, Box, Typography } from '@mui/material';
import { CustomButton } from '../../ui/button';
import { UserReportsCard } from '../userReportsCards';
import { useGetPetsOfUser } from "../../hooks/petsOfUser";
import { userReportDisplayTheme } from './themes';


export function UserReportsDisplay() {
    const petsOfUser = useGetPetsOfUser();

    const navigate = useNavigate();

    const handlePostClick = (e) => {
        e.preventDefault();
        navigate("/create-report");
    }

    return (
        <ThemeProvider theme={userReportDisplayTheme}>
            <Container disableGutters={true} className="homeCardContainer">
                <List className="listCard">
                    { petsOfUser.length > 0 
                    ? ( petsOfUser.map((pet, index) => (
                            <ListItem className='listItem' disablePadding key={pet.id}>
                                <UserReportsCard pet={pet} />
                            </ListItem>
                    )))
                    : (
                        <Container disableGutters={true} className="notFoundContainer">
                            <Box    component="img" 
                                    src="../../src/assets/publicacion.png"
                                    sx={{ 
                                        width: {xs: '100px', sm: '130px', md: '160px'}, 
                                        height: {xs: '100px', sm: '130px', md: '160px'}, 
                                    }} >
                            </Box>
                            <Container disableGutters={true} className="notFoundTextButtonContainer">
                                <Typography variant="h4" className="notFoundText"> 
                                    Aún no has hecho reportes de mascotas perdidas
                                </Typography>
                                <CustomButton   variant="contained"
                                                onClick={handlePostClick}
                                                sx={{ 
                                                    backgroundColor: '#191970',
                                                    '&:hover': {
                                                        backgroundColor: '#00004e',
                                                    }
                                                }} >
                                    Publicar reporte
                                </CustomButton>
                            </Container>
                        </Container>
                    )}
                </List>
            </Container>
        </ThemeProvider>
    )
}