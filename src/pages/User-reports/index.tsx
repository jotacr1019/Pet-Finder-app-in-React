import React, { Suspense } from "react";
import { Container, ThemeProvider, Typography, CircularProgress } from "@mui/material";
import { UserReportsDisplay } from "../../components/userReportsDisplay";
import { userReportsTheme } from "./themes";

export function UserReports(){
    return  <ThemeProvider theme={userReportsTheme}>
                <Container disableGutters={true} className="userReportsContainer">
                    <Suspense fallback={<Loading />}>
                        <Typography variant="h2" className="title" >
                            Mis mascotas reportadas
                        </Typography>
                        <UserReportsDisplay />
                    </Suspense>
                </Container>
            </ThemeProvider>
}

function Loading(){
    return  <CircularProgress sx={{color: "#191970"}} size={80} />
}