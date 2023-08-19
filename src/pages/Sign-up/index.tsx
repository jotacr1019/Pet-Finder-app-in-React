import React from "react";
import { FormSignup } from "../../components/formSignup";
import { Box } from '@mui/material';


export function SignUp(){
    return <Box sx={{ display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // height: {xs: '92.4vh', sm: '90.4vh' , md: '90.4vh'}, 
                    width: '100%',
                    height: 'fit-content',
                    minWidth: '375px', 
                    padding: {xs: '50px 8px', sm: '50px 12px' , md: '50px 15px', lg: '50px 24px'},
                    backgroundColor: '#4267ac'}}>
                <FormSignup />
            </Box>
}
