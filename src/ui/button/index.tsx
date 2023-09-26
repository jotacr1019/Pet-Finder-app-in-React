import React from "react";
import { Button } from "@mui/material";


export function CustomButton({...props}) {
    return <Button variant={props.variant}
                    size={props.size}
                    disabled={props.disabled}
                    onClick={props.onClick}
                    className={props.className}
                    sx={props.sx}
                    type={props.type} >
                {props.children}
            </Button>
}