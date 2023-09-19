import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, ThemeProvider, List, ListItem, Box, Typography, CircularProgress } from '@mui/material';
import { CustomButton } from '../../ui/button';
import { UserReportsCard } from '../userReportsCards';
import { getPetsOfUser } from "../../hooks/petsOfUser";
import { userReportDisplayTheme } from './themes';


export function UserReportsDisplay() {
    const [petsFound, setPetsFound] = useState([]);
    const [wildCard, setWildCard] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getPetsOfUser().then((data) => {
            data.length > 0 ? setWildCard(false) : setWildCard(true);
            setPetsFound(data);
        })
    }, []);

    const handlePostClick = (e) => {
        e.preventDefault();
        navigate("/create-report");
    }

    return (
        <ThemeProvider theme={userReportDisplayTheme}>
            <Container disableGutters={true} className="homeCardContainer">
                <List className="listCard">
                    { petsFound.length > 0 
                    ?   ( petsFound.map((pet, index) => (
                            <ListItem className='listItem' disablePadding key={pet.id}>
                                <UserReportsCard pet={pet} />
                            </ListItem>
                        )))
                    :   petsFound.length < 1 && wildCard 
                    ?   ( <Container disableGutters={true} className="notFoundContainer">
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
                    )
                    :   <CircularProgress   size={60} 
                                            sx={{
                                                color: "#191970",
                                                justifySelf: "center",
                                                marginTop: {xs: "160px", sm: "162px", md: "132px"},
                                                marginBottom: {xs: "162px", sm: "142px", md: "42px"}
                                            }}
                        /> 
                    }
                </List>
            </Container>
        </ThemeProvider>
    )
}