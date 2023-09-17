import React from 'react'
import { Container, Typography, ThemeProvider } from '@mui/material';
import { FormEditReport } from '../../components/formEditReport';
import { editReportTheme } from './themes';


export function EditReport(){
    return  <ThemeProvider theme={editReportTheme}>
                <Container disableGutters={true} className="editReportContainer" >
                    <Typography variant="h2" className="title" >
                        Editar reporte de mascota
                    </Typography>
                    <Typography variant='h5' className="subtitle" >
                        Realizá los cambios que consideres necesarios, y guardá la información
                    </Typography>
                    <FormEditReport />
                </Container>
            </ThemeProvider>
}