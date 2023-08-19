import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, Box } from '@mui/material';
import Grow from '@mui/material/Grow';
import { CustomButton } from "../../ui/button";
import { CustomTextField } from "../../ui/textField";
import { CustomPasswordField } from "../../ui/passwordField";
import css from "./index.module.css";


export function FormSignup(){
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked((prev) => !prev);
    }, [])
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.name.value);
        console.log(e.target.email.value);
        console.log(e.target.password.value);
        console.log(e.target.confirmPassword.value);
    }

    return (<Grow in={checked}>
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
                            id="outlined-name-input"
                            label="Nombre"
                            placeholder="Ingresa tu nombre"
                            name="name"
                            // helperText="Incorrect entry."
                        />
                        <CustomTextField
                            id="outlined-email-input"
                            label="Email"
                            placeholder="ejemplo@mail.com"
                            name="email"
                            // helperText="Incorrect entry."
                        />
                        <CustomPasswordField 
                            id='outlined-adornment-password'
                            outlinedInputLabel='Contraseña'
                            label='Contraseña'
                            name='password'>
                        </CustomPasswordField>
                        <CustomPasswordField 
                            id='outlined-adornment-confirm-password'
                            outlinedInputLabel='Confirmar contraseña'
                            label='Confirmar contraseña'
                            name='confirmPassword' >
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
                </Box>
            </Grow>)
}