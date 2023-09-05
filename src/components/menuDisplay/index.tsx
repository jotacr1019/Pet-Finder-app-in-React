import React from "react";
import { Container, ThemeProvider } from '@mui/material';
import { CustomEditData } from "../editPersonalData";
import { CustomEditPassword } from "../editPassword";
import { useBackdropFilterState } from "../../atoms";
import { menuDisplayTheme } from "./themes";


export function MenuDisplay(){
    const [backDropFilter, setBackDropFilter] = useBackdropFilterState();

    return  (<ThemeProvider theme={menuDisplayTheme}>
                <Container  disableGutters={true} 
                            className="container" 
                            sx={{ backdropFilter: backDropFilter }} >
                    <CustomEditData></CustomEditData>
                    <CustomEditPassword></CustomEditPassword>
                </Container>
            </ThemeProvider>)
}