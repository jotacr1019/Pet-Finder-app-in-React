import React from "react";
import { Box } from '@mui/material';
import { CustomEditData } from "../editPersonalData";
import { CustomEditPassword } from "../editPassword";
import { useBackdropFilterState } from "../../atoms";


export function MenuDisplay(){
    const [backDropFilter, setBackDropFilter] = useBackdropFilterState();

    return  <Box sx={{  display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        width: '100%', 
                        height: '70%',
                        padding: '10px', 
                        border: "1px solid",
                        borderRadius: '6px',
                        backdropFilter: backDropFilter,
                        boxShadow: 'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;'
                    }} >
                <CustomEditData></CustomEditData>
                <CustomEditPassword></CustomEditPassword>
            </Box>
}