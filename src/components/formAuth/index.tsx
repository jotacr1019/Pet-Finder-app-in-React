import React, { useState, useEffect } from "react";
import { TextField,
    Typography,
    Link, 
    FormControl, 
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Button,
    Box } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Grow from '@mui/material/Grow';
import { CustomButton } from "../../ui/button";


export function FormAuth(){
    const [checked, setChecked] = React.useState(false);
    // const handleChange = () => {
    //     setChecked((prev) => !prev);
    // };
    useEffect(() => {
        setChecked((prev) => !prev);
    }, [])

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.email.value);
        console.log(e.target.password.value);
    }

    return (<Grow in={checked}>
            <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                    width: { xs: '80%', sm: '60%' , md: '50%', lg: '40%' },
                    height: '68%',
                    padding: { xs: '22px 35px', sm: '32px 48px' , md: '28px 48px', lg: '28px 54px' },
                    backgroundColor: "#212121",
                    borderRadius: "6px" }}>
                <Box component="form" onSubmit={handleFormSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: { xs: '28px', sm: '22px' , md: '16px', lg: '16px' }
                    }}>
                    <Typography sx={{ textAlign: 'center',
                                    color: 'white',
                                    marginBottom: { xs: '18px', sm: '15px' , md: '20px', lg: '25px' },
                                    typography: { xs: {fontSize: '1.8rem'}, sm: {fontSize: '2.2rem'}, md: {fontSize: '2.8rem'} }
                    }}>Iniciar sesión</Typography>
                    <TextField
                        id="outlined-email-input"
                        type="text"
                        label="Email"
                        defaultValue=""
                        placeholder="ejemplo@mail.com"
                        // helperText="Incorrect entry."
                        name="email"
                        sx={{ input: { color: 'white' },
                        label: { color: 'white' },
                        color: 'white',
                        '.css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white !important'
                        }
                        }} 
                    />
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password" sx={{ color: 'white' }}>Contraseña</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            sx={{
                                color: 'white',
                                '.css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white !important'
                                }
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        sx={{ color: 'white' }}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Contraseña"
                        />  
                    </FormControl>
                    <Typography sx={{ display: 'flex',
                                    alignSelf: 'center',
                                    gap: '6px',
                                    color: 'white',
                                    marginTop: {xs: '14px', sm: '14px', md: '20px', lg: '20px'},
                                    fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } }}>
                    ¿Aún no tienes cuenta?<Link>Regístrate</Link></Typography>
                    {/* <Button type="submit" variant="contained">Submit</Button> */}
                    <CustomButton type="submit" variant="contained">Acceder</CustomButton>
                </Box>
            </Box>
            </Grow>)
}