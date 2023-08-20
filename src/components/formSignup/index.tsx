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
import { useNewUserData, useCreateUserInDB } from "../../hooks/createUser";
import { createUserInDB } from "../../lib/api";
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

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [openReload, setOpenReload] = useState(false);

    const navigate = useNavigate();

    const handleInputsCompletation = (event) => {
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
        console.log(e.target.name.value);
        const full_name = e.target.name.value
        console.log(e.target.email.value);
        const email = e.target.email.value
        console.log(e.target.password.value);
        const password = e.target.password.value
        console.log(e.target.confirmPassword.value);
        const confirmPassword = e.target.confirmPassword.value

        if(password !== confirmPassword){
            setOpenReload(false)
            console.log("Las contraseñas no coinciden");
        } else {
            if(isEmail(e.target.email.value)){
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
                    setOpenSnackbar(true);
                }
            } else {
                setOpenReload(false)
                setIsValidEmail(false);
                setErrorLabel(true);
            }
        }

    }

    return (<Grow in={growChecked}>
                <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                        width: { xs: '80%', sm: '70%' , md: '55%', lg: '40%' },
                        height: 'fit-content',
                        padding: { xs: '22px 20px', sm: '22px 50px' , md: '22px 58px', lg: '28px 54px' },
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
                                        marginBottom: { xs: '8px', sm: '15px' , md: '20px', lg: '25px' },
                                        typography: { xs: {fontSize: '1.8rem'}, sm: {fontSize: '2.2rem'}, md: {fontSize: '2.8rem'} }
                                    }} >
                            Registrarse
                        </Typography>
                        <Typography sx={{ textAlign: 'center',
                                        gap: '6px',
                                        color: 'white',
                                        marginTop: {xs: '0px', sm: '14px', md: '20px', lg: '20px'},
                                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } }}>
                            Ingresa los siguientes datos para completar el registro
                        </Typography>
                        <CustomTextField
                            required={true}
                            id="outlined-name-input"
                            label="Nombre"
                            placeholder="Ingresa tu nombre"
                            name="name"
                            onChange={handleInputsCompletation}
                        />
                        <CustomTextField
                            required={true}
                            id="outlined-email-input"
                            label="Email"
                            placeholder="ejemplo@mail.com"
                            name="email"
                            onChange={handleInputsCompletation}
                            error={errorLabel && isValidEmail === false}
                        />
                        <CustomPasswordField
                            required={true} 
                            id='outlined-adornment-password'
                            outlinedInputLabel='Contraseña'
                            label='Contraseña'
                            name='password'
                            onChange={handleInputsCompletation}>
                        </CustomPasswordField>
                        <CustomPasswordField 
                            required={true}
                            id='outlined-adornment-confirm-password'
                            outlinedInputLabel='Confirmar contraseña'
                            label='Confirmar contraseña'
                            name='confirmPassword'
                            onChange={handleInputsCompletation} >
                        </CustomPasswordField>
                        <Typography sx={{ display: 'flex',
                                        alignSelf: 'center',
                                        gap: '6px',
                                        color: 'white',
                                        marginTop: {xs: '14px', sm: '14px', md: '20px', lg: '20px'},
                                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } }}>
                            ¿Ya tienes una cuenta?
                            <Link to={'/auth'} className={css.link}>
                                Inicia sesión
                            </Link>
                        </Typography>
                        <CustomButton type="submit" variant="contained">Registrarse</CustomButton>
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
                        open={openReload}
                    >   
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Box>
            </Grow>)
}