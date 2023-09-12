import React, { useState } from "react";
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


export function CustomPasswordField({...props}){
    const [showPassword, setShowPassword] = useState(false);
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return <FormControl variant="outlined" required={props.required}>
                <InputLabel htmlFor="outlined-adornment-password" sx={{ color: 'white' }} >
                    {props.label}
                </InputLabel>
                <OutlinedInput
                    label={props.outlinedInputLabel}
                    name={props.name}
                    id={props.id}
                    onChange={props.onChange}
                    type={showPassword ? 'text' : 'password'}
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
                                sx={{ color: 'white' }} >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />  
            </FormControl>
}