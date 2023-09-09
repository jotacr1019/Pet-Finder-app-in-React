import React, {useEffect, useState} from 'react'
import { Container, Typography, ThemeProvider } from '@mui/material';
import { FormCreateReport } from '../../components/formCreateReport';
import { createReportTheme } from './themes';


export function CreateReport(){
    return  <ThemeProvider theme={createReportTheme}>
                <Container disableGutters={true} className="createReportContainer" >
                    <Typography variant="h2" className="title" >
                        Reportar Mascota
                    </Typography>
                    <Typography variant='h5' className="subtitle" >
                        Ingresa la siguiente información para realizar el reporte de la mascota
                    </Typography>
                    <FormCreateReport />
                </Container>
            </ThemeProvider>
}