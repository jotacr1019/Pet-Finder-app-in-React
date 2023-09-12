import React, { useState, useEffect } from 'react';
import { Container, ThemeProvider, List, ListItem, Skeleton } from '@mui/material';
import { UserReportsCard } from '../userReportsCards';
import { useGetPetsOfUser } from "../../hooks/petsOfUser";
import { userReportDisplayTheme } from './themes';


export function UserReportsDisplay() {
    const { getPetsOfUser } = useGetPetsOfUser();

    const [petsFound, setPetsFound] = useState([]);

    useEffect(() => {
        getPetsOfUser().then((petsFound) => {
            setPetsFound(petsFound);
        });
    }, []);

    return (
        <ThemeProvider theme={userReportDisplayTheme}>
            <Container disableGutters={true} className="homeCardContainer">
                <List className="listCard">
                    {petsFound.length > 0
                    ? (petsFound.map((pet, index) => (
                        <ListItem className='listItem' disablePadding key={pet.id}>
                            <UserReportsCard pet={pet} />
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