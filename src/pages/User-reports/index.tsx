import React, { Suspense } from "react";
import { Container, ThemeProvider, Typography } from "@mui/material";
import { UserReportsCards } from "../../components/userReportsCards";
import { userReportsTheme } from "./themes";
import css from "./index.module.css";

export function UserReports(){
    return  <ThemeProvider theme={userReportsTheme}>
                    <Container disableGutters={true} className="userReportsContainer">
                        <Typography variant="h2" className="title" >
                            Mis mascotas reportadas
                        </Typography>
                            <UserReportsCards />
                    </Container>
            </ThemeProvider>
}