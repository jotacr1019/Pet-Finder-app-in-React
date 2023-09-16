import React, { Suspense } from 'react'
import { Container, Typography, ThemeProvider, CircularProgress } from '@mui/material';
import { FormEditReport } from '../../components/formEditReport';
import { editReportTheme } from './themes';


export function EditReport(){
    return  <ThemeProvider theme={editReportTheme}>
                <Container disableGutters={true} className="editReportContainer" >
                <Suspense fallback={<Loading />}>
                    <Typography variant="h2" className="title" >
                        Editar reporte de mascota
                    </Typography>
                    <Typography variant='h5' className="subtitle" >
                        Realizá los cambios que consideres necesarios, y guardá la información
                    </Typography>
                    <FormEditReport />
                </Suspense>
                </Container>
            </ThemeProvider>
}

function Loading(){
    return  <CircularProgress size={60} sx={{color: "#191970"}} />
}