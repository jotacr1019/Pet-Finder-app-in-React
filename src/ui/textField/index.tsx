import React, { useState } from "react";
import { TextField } from "@mui/material";


export function CustomTextField({...props}) {
    return <TextField
                required={props.required}
                id={props.id}
                name={props.name}
                label={props.label}
                placeholder={props.placeholder}
                onChange={props.onChange}
                onBlur={props.onBlur}
                error={props.error}
                // helperText={props.helperText}
                type="text"
                defaultValue=""
                // helperText="Incorrect entry."
                sx={{ input: { color: 'white' },
                    label: { color: 'white' },
                    color: 'white',
                    width: '100%',
                    '.css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white !important'
                    }
                }} 
            />;
}