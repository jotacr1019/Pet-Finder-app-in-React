import React from "react";
import { FormAuth } from "../../components/formAuth";
import { Box } from '@mui/material';


export function Auth(){
    return <Box sx={{ display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: {xs: '92.4vh', sm: '90.4vh' , md: '90.4vh'}, 
                    width: '100%',
                    minWidth: '375px', 
                    backgroundColor: '#4267ac'}}>
                <FormAuth />
            </Box>
}