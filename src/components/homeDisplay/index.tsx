import React, { useState, useEffect } from 'react';
import { Container, 
    Box, 
    ThemeProvider, 
    Typography, 
    TextField,
    Backdrop,
    CircularProgress,
    List, 
    ListItem} from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { HomeCard } from '../homeCards';
import { CustomTextField } from '../../ui/textField';
import { CustomButton } from '../../ui/button';
import { CustomSnackbar } from '../../ui/snackbar';
import { useGetPetsAroundZone } from '../../hooks/petsAround';
import { useCreateReport } from '../../hooks/createReport';
import { homeDisplayTheme } from './themes';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

type PetData = {
    id: number;
    name: string;
    userId: number;
}

type UserData = {
    reporter_name: string;
    phone: string;
    message: string;
}

export function HomeDisplay() {
    const petsFound = useGetPetsAroundZone();

    const { createReport } = useCreateReport();

    const [petData, setPetData] = useState({} as PetData);

    const [userData, setUserData] = useState({} as UserData);

    const [reportFormOpen, setReportFormOpen] = useState(false);

    const [openReload, setOpenReload] = useState(false);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openUncompleteSnackbar, setOpenUncompleteSnackbar] = useState(false);
    const [openFailSnackbar, setOpenFailSnackbar] = useState(false);

    useEffect(() => {
        petsFound === null ? setOpenFailSnackbar(true) : null;
    }, [petsFound])

    const handleClickFromCard = (petData: PetData): void => {
        setPetData({
            id: petData.id,
            name: petData.name,
            userId: petData.userId
        });
        setReportFormOpen(true);
    }

    const handleCloseReportForm = () => {
        setReportFormOpen(false);
    };

    const handleInputsChange = (e, field: string) => {
        e.preventDefault();
        setUserData({
            ...userData,
            [field]: e.target.value
        });
    }

    const handleSendClick = async(e) => {
        e.preventDefault();
        setOpenReload(true);

        if(!userData.reporter_name || !userData.phone || !userData.message){
            setOpenReload(false);
            setOpenUncompleteSnackbar(true);
            return;
        }

        let reportResponse: boolean = false
        reportResponse = await createReport({
            reporter_name: userData.reporter_name,
            phone_number: userData.phone,
            message: userData.message,
            petId: petData.id,
            pet_name: petData.name,
            userId: petData.userId
        })

        if(!reportResponse){
            setOpenReload(false);
            setOpenFailSnackbar(true);
        }

        setOpenReload(false);
        setOpenSuccessSnackbar(true);
        handleCloseReportForm();
    }

    return (
        <ThemeProvider theme={homeDisplayTheme}>
            <Container disableGutters={true} className='homeCardContainer'>
                <List className='listCard'>
                    {petsFound?.length < 1 || !petsFound
                        ?   <Container disableGutters={true} className='notFoundContainer'>
                                <Box    component='img' 
                                        src='../../src/assets/notDog.png'
                                        sx={{ 
                                            width: {xs: '100px', sm: '130px', md: '160px'}, 
                                            height: {xs: '100px', sm: '130px', md: '160px'}, 
                                        }} >
                                </Box>
                                <Typography variant='h4' className='notFoundText'> 
                                    No hay mascotas reportadas cerca de tu ubicación
                                </Typography>
                            </Container>
                        :   petsFound?.map((pet, index) => (
                                <ListItem className='listItem' disablePadding key={index} >
                                    <HomeCard pet={pet} onChange={handleClickFromCard} />
                                </ListItem>
                    ))
                    }
                </List>
            </Container>
            <BootstrapDialog
                            open={reportFormOpen}
                            sx={{
                                m: {sm: 'auto'},
                                zIndex: 100
                            }} >
                    <Container className='secondaryContainer' >
                        <CustomButton 
                                    onClick={handleCloseReportForm}
                                    variant='text'
                                    className='closeButton' >
                            <CloseIcon />
                        </CustomButton>
                        <Typography
                                variant='h4'
                                className='reportTitle'
                                gutterBottom >
                            Enviar reporte de {petData?.name}
                        </Typography>
                    </Container>
                    <DialogContent className='dialogContent'>
                        <CustomTextField onChange={(e) => handleInputsChange(e, 'reporter_name')}
                                        id='outlined-reporter-name'
                                        label='Nombre'
                                        placeholder='Ingresa tu nombre'
                                        name='reporter_name'
                                        InputLabelProps={{
                                            shrink: true,
                                        }} >
                        </CustomTextField>
                        <CustomTextField onChange={(e) => handleInputsChange(e, 'phone')}
                                        id='outlined-reporter-name'
                                        label='Teléfono'
                                        placeholder='Ejem: 8888-8888'
                                        name='phone_number'
                                        InputLabelProps={{
                                            shrink: true,
                                        }} >
                        </CustomTextField>
                        <TextField onChange={(e) => handleInputsChange(e, 'message')}
                                id='outlined-multiline-static'
                                label='¿Dónde lo viste?'
                                multiline
                                rows={5}
                                name='message'
                                className='messageTextField'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                        />
                        <CustomButton   
                                    sx={{ width: '100%' }}
                                    variant='contained'
                                    onClick={handleSendClick} >
                            Enviar información
                        </CustomButton>
                    </DialogContent>
                </BootstrapDialog>
                <CustomSnackbar open={openSuccessSnackbar} severity='success' onClose={setOpenSuccessSnackbar}>
                    Reporte enviado exitosamente!
                </CustomSnackbar>
                <CustomSnackbar open={openUncompleteSnackbar} severity='warning' onClose={setOpenUncompleteSnackbar}>
                    Falta información por completar!
                </CustomSnackbar>
                <CustomSnackbar open={openFailSnackbar} severity='error' onClose={setOpenFailSnackbar}>
                    Ha sucedido un error, intentalo de nuevo!
                </CustomSnackbar>
                <Backdrop
                    sx={{ color: '#fff', zIndex: 110 }}
                    open={openReload} >   
                    <CircularProgress color='inherit' />
                </Backdrop>
        </ThemeProvider>
    )
}