import React from "react";
import { TextField } from "@mui/material";


export function CustomTextField({...props}) {
    return <TextField
                required={props.required}
                disabled={props.disabled}
                id={props.id}
                name={props.name}
                label={props.label}
                placeholder={props.placeholder}
                onChange={props.onChange}
                onBlur={props.onBlur}
                InputLabelProps={props.InputLabelProps}
                InputProps={props.InputProps}
                error={props.error}
                type="text"
                value={props.value}
                sx={{ input: { color: '#fff' },
                    label: { color: '#fff' },
                    color: '#fff',
                    width: '100%',
                    '.css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                        borderColor: '#fff !important'
                    }
                }} 
            />;
}