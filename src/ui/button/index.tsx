import React from "react";
import { Button } from "@mui/material";


export function CustomButton({...props}) {
    return <Button  type={props.type} 
                    variant={props.variant}
                    size={props.size}
                    onClick={props.onClick}
                    sx={props.sx}
            >{props.children}</Button>
}