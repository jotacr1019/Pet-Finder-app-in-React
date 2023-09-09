import React from "react";
import { Container, ThemeProvider, Typography } from "@mui/material";
import { HomeCards } from "../../components/cards";
import { HomeTheme } from "./themes";

export function Home(){
    return  <ThemeProvider theme={HomeTheme}>
                <Container disableGutters={true} className="homeContainer">
                    <Typography variant="h2" className="title" >
                        Mascotas Perdidas cerca de tu ubicación
                    </Typography>
                    <HomeCards />
                </Container>
            </ThemeProvider>
}