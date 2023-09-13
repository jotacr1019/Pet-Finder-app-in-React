import React from "react";
import { Container, ThemeProvider, Typography } from "@mui/material";
import { UserReportsDisplay } from "../../components/userReportsDisplay";
import { userReportsTheme } from "./themes";

export function UserReports(){
    return  <ThemeProvider theme={userReportsTheme}>
                <Container disableGutters={true} className="userReportsContainer">
                    <Typography variant="h2" className="title" >
                        Mis mascotas reportadas
                    </Typography>
                    <UserReportsDisplay />
                </Container>
            </ThemeProvider>
}