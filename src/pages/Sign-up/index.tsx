import React from "react";
import { FormSignup } from "../../components/formSignup";
import { Container, ThemeProvider } from '@mui/material';
import { signUpTheme } from "./themes";


export function SignUp(){
    return  <ThemeProvider theme={signUpTheme}>
                <Container disableGutters={true} className="signUpContainer" >
                    <FormSignup />
                </Container>
            </ThemeProvider>
}
