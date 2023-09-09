import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import isEmail from 'validator/lib/isEmail';
import { Typography,
    Box,
    Container,
    Snackbar,
    Backdrop,
    CircularProgress,
    ThemeProvider,
    Grow } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { CustomButton } from "../../ui/button";
import { CustomTextField } from "../../ui/textField";
import { CustomPasswordField } from "../../ui/passwordField";
import { useNewUserData, useCreateUserInDB } from "../../hooks/createUser";
import { formSignupTheme } from "./themes";
import css from "./index.module.css";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function FormSignup(){
    const [userData, setUserData] = useNewUserData();
    const { createUser } = useCreateUserInDB();

    const [isValidEmail, setIsValidEmail] = useState(false)  

    const [growChecked, setGrowChecked] = useState(false);

    const [errorLabel, setErrorLabel] = useState(false);

    const [urlVisible, setUrlVisible] = useState(false);

    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const [openEmailSnackbar, setOpenEmailSnackbar] = useState(false);
    const [openPasswordSnackbar, setOpenPasswordSnackbar] = useState(false);

    const [openReload, setOpenReload] = useState(false);

    const navigate = useNavigate();

    const handleInputsCompletation = (event) => {
        setUrlVisible(Boolean(event.target.value.length));
    };

    const handleSnackbarClose = (closeSnackbar, event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        closeSnackbar(false);
    };

    useEffect(() => {
        setGrowChecked((prev) => !prev);
    }, [])
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setOpenReload(true);
        const full_name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value
        const confirmPassword = e.target.confirmPassword.value

        if(password !== confirmPassword){
            setOpenReload(false)
            console.log("Las contraseñas no coinciden");
            setOpenPasswordSnackbar(true);
            return;
        }

        if(!isEmail(e.target.email.value)){
            setOpenReload(false);
            setOpenEmailSnackbar(true);
            setIsValidEmail(false);
            setErrorLabel(true);
            return;
        }

        setIsValidEmail(true);
        setErrorLabel(false);
        setUserData({
            full_name,
            email,
            password
        });
        const response = await createUser({full_name, email, password});
        
        if (response) {
            setOpenReload(false)
            e.target.reset();
            navigate("/user-reports");
        } else {
            setOpenReload(false)
            setOpenErrorSnackbar(true);
        }
    }

    return (
        <ThemeProvider theme={formSignupTheme}>
            <Grow in={growChecked}>
                <Container disableGutters={true} className="formSignupContainer" >
                    <Box    component="form" 
                            onSubmit={handleFormSubmit}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                gap: { xs: '28px', sm: '22px' , md: '16px', lg: '16px' }
                            }} >
                        <Typography variant="h3" className="title" >
                            Registrarse
                        </Typography>
                        <Typography variant="body1" className="subtitle" >
                            Ingresa los siguientes datos para completar el registro
                        </Typography>
                        <CustomTextField
                                    required={urlVisible}
                                    id="outlined-name-input"
                                    label="Nombre"
                                    placeholder="Ingresa tu nombre"
                                    name="name"
                                    onChange={handleInputsCompletation}
                        />
                        <CustomTextField
                                    required={urlVisible}
                                    id="outlined-email-input"
                                    label="Email"
                                    placeholder="ejemplo@mail.com"
                                    name="email"
                                    onChange={handleInputsCompletation}
                                    error={errorLabel && isValidEmail === false}
                        />
                        <CustomPasswordField
                                    required={urlVisible} 
                                    id='outlined-adornment-password'
                                    outlinedInputLabel='Contraseña'
                                    label='Contraseña'
                                    name='password'
                                    onChange={handleInputsCompletation} >
                        </CustomPasswordField>
                        <CustomPasswordField 
                                    required={urlVisible}
                                    id='outlined-adornment-confirm-password'
                                    outlinedInputLabel='Confirmar contraseña'
                                    label='Confirmar contraseña'
                                    name='confirmPassword'
                                    onChange={handleInputsCompletation} >
                        </CustomPasswordField>
                        <Typography variant="body2" className="text" >
                            ¿Ya tienes una cuenta?
                            <Link to={'/auth'} className={css.link}>
                                Inicia sesión
                            </Link>
                        </Typography>
                        <CustomButton type="submit" variant="contained">Registrarse</CustomButton>
                    </Box>
                    <Snackbar   open={openErrorSnackbar} 
                                autoHideDuration={5000} 
                                onClose={() => handleSnackbarClose(setOpenErrorSnackbar)} >
                        <Alert  onClose={() => handleSnackbarClose(setOpenErrorSnackbar)} 
                                severity="error" 
                                sx={{ width: '100%' }} >
                            Email o contraseña incorrectos!
                        </Alert>
                    </Snackbar>
                    <Snackbar   open={openEmailSnackbar} 
                                autoHideDuration={5000} 
                                onClose={() => handleSnackbarClose(setOpenEmailSnackbar)} >
                        <Alert  onClose={() => handleSnackbarClose(setOpenEmailSnackbar)} 
                                severity="error" 
                                sx={{ width: '100%' }} >
                            No es un formato de correo válido!
                        </Alert>
                    </Snackbar>
                    <Snackbar   open={openPasswordSnackbar} 
                                autoHideDuration={5000} 
                                onClose={() => handleSnackbarClose(setOpenPasswordSnackbar)} >
                        <Alert  onClose={() => handleSnackbarClose(setOpenPasswordSnackbar)} 
                                severity="error" 
                                sx={{ width: '100%' }} >
                            Las contraseñas no coinciden!
                        </Alert>
                    </Snackbar>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={openReload}
                    >   
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Container>
            </Grow>
        </ThemeProvider>)
}