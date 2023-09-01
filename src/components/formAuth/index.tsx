import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import isEmail from 'validator/lib/isEmail';
import { Typography,
    Box,
    Snackbar,
    Backdrop,
    CircularProgress,
    Grow } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { CustomButton } from "../../ui/button";
import { CustomTextField } from "../../ui/textField";
import { CustomPasswordField } from "../../ui/passwordField";
import { useAuthData, useAuthUserInDB } from "../../hooks/authUser";
import { authUserInDB } from "../../lib/api";
import css from "./index.module.css";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

    const handleEmailandPasswordInputs = (event) => {
        setUrlVisible(Boolean(event.target.value.length));
    };

    const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    useEffect(() => {
        setGrowChecked((prev) => !prev);
    }, [])
    
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

    return (<Grow in={growChecked}>
                <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                        width: { xs: '80%', sm: '60%' , md: '50%', lg: '40%' },
                        height: '68%',
                        padding: { xs: '22px 35px', sm: '32px 48px' , md: '28px 48px', lg: '28px 54px' },
                        backgroundColor: "#212121",
                        borderRadius: "6px" }} >
                    <Box    component="form" 
                            onSubmit={handleFormSubmit}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                gap: { xs: '28px', sm: '22px' , md: '16px', lg: '16px' }
                            }} >
                        <Typography sx={{ textAlign: 'center',
                                        color: 'white',
                                        marginBottom: { xs: '18px', sm: '15px' , md: '20px', lg: '25px' },
                                        typography: { xs: {fontSize: '1.8rem'}, sm: {fontSize: '2.2rem'}, md: {fontSize: '2.8rem'} }
                                    }} >
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
                        <Typography sx={{ display: 'flex',
                                        alignSelf: 'center',
                                        gap: '6px',
                                        color: 'white',
                                        marginTop: {xs: '14px', sm: '14px', md: '20px', lg: '20px'},
                                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } }}>
                            ¿Aún no tienes cuenta?
                            <Link to={'/sign-up'} className={css.link}>
                                Regístrate
                            </Link>
                        </Typography>
                        <CustomButton type="submit" variant="contained">Acceder</CustomButton>
                    </Box>
                    <Snackbar   open={openSnackbar} 
                                autoHideDuration={5000} 
                                onClose={handleSnackbarClose} >
                        <Alert  onClose={handleSnackbarClose} 
                                severity="error" 
                                sx={{ width: '100%' }} >
                            Email o contraseña incorrectos!
                        </Alert>
                    </Snackbar>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={openReload} >   
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Box>
            </Grow>)
}