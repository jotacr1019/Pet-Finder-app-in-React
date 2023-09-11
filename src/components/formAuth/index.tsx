import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import isEmail from 'validator/lib/isEmail';
import { Typography,
    Box,
    Container,
    Backdrop,
    CircularProgress,
    Grow,
    ThemeProvider } from '@mui/material';
import { CustomButton } from "../../ui/button";
import { CustomTextField } from "../../ui/textField";
import { CustomSnackbar } from '../../ui/snackbar';
import { CustomPasswordField } from "../../ui/passwordField";
import { useAuthData, useAuthUserInDB } from "../../hooks/authUser";
// import { authUserInDB } from "../../lib/api";
import { formAuthTheme } from "./themes";
import css from "./index.module.css";


export function FormAuth(){
    const [authData, setAuthData] = useAuthData();
    const { login } = useAuthUserInDB();

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [openReload, setOpenReload] = useState(false);

    const [isValidEmail, setIsValidEmail] = useState(false)  

    const [errorLabel, setErrorLabel] = useState(false);
    
    const [urlVisible, setUrlVisible] = useState(false);
    
    const [growChecked, setGrowChecked] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setGrowChecked((prev) => !prev);
    }, [])

    const handleEmailandPasswordInputs = (event) => {
        setUrlVisible(Boolean(event.target.value.length));
    };
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setOpenReload(true);
        const email = e.target.email.value;
        const password = e.target.password.value;

        if(!isEmail(e.target.email.value)){
            setOpenReload(false)
            setIsValidEmail(false);
            setErrorLabel(true);
            return;
        }

        setIsValidEmail(true);
        setErrorLabel(false);
        setAuthData(email);
        const response = await login(email, password);
        
        if (response) {
            setOpenReload(false)
            e.target.reset();
            navigate("/menu");
        } else {
            setOpenReload(false)
            setOpenSnackbar(true);
        }
    }

    return (<ThemeProvider theme={formAuthTheme}>
                <Grow in={growChecked}>
                    <Container disableGutters={true} className="formAuthContainer">
                        <Box    component="form" 
                                onSubmit={handleFormSubmit}
                                sx={{   display: 'flex',
                                        flexDirection: 'column',
                                        width: '100%',
                                        gap: { xs: '28px', sm: '22px' , md: '16px', lg: '16px' }
                                }} >
                            <Typography variant="h3" className="title" >
                                Iniciar sesión
                            </Typography>
                            <CustomTextField
                                        required={true}
                                        id="outlined-email"
                                        label="Email"
                                        placeholder="ejemplo@mail.com"
                                        name="email"
                                        onChange={handleEmailandPasswordInputs}
                                        error={errorLabel && isValidEmail === false} 
                            />
                            <CustomPasswordField
                                        required={true} 
                                        id='outlined-adornment-password'
                                        outlinedInputLabel='Contraseña'
                                        label='Contraseña'
                                        name='password'
                                        onChange={handleEmailandPasswordInputs} >
                            </CustomPasswordField>
                            <Typography variant="body2" className="text" >
                                ¿Aún no tienes cuenta?
                                <Link to={'/sign-up'} className={css.link}>
                                    Regístrate
                                </Link>
                            </Typography>
                            <CustomButton type="submit" variant="contained" >
                                Acceder
                            </CustomButton>
                        </Box>
                        <CustomSnackbar open={openSnackbar} severity="error" onClose={setOpenSnackbar}>
                            Email o contraseña incorrectos!
                        </CustomSnackbar>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={openReload} >   
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </Container>
                </Grow>
            </ThemeProvider>)
}