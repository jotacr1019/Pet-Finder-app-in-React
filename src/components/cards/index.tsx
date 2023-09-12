import React, { useState, useEffect } from 'react';
import { Container, 
    Box, 
    ThemeProvider, 
    Typography, 
    TextField,
    Backdrop,
    CircularProgress,
    List, 
    ListItem, 
    Button } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import PetsIcon from '@mui/icons-material/Pets';
import CloseIcon from '@mui/icons-material/Close';
import { CustomTextField } from '../../ui/textField';
import { CustomButton } from '../../ui/button';
import { CustomSnackbar } from '../../ui/snackbar';
import { usePetsFound } from "../../hooks/petsAround";
import { useCreateReport } from "../../hooks/createReport";
import { homeCardTheme } from './themes';
import css from './index.module.css';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

type petData = {
    id: number;
    name: string;
    userId: number;
}

type userData = {
    reporter_name: string;
    phone: string;
    message: string;
}

export function HomeCards() {
    const [petsFound] = usePetsFound();

    const { createReport } = useCreateReport();

    const [petData, setPetData] = useState({} as petData);

    const [userData, setUserData] = useState({} as userData);

    const [imageClassName, setImageClassName] = useState('cardImageStaticContainer');

    const [reportFormOpen, setReportFormOpen] = useState(false);

    const [openReload, setOpenReload] = useState(false);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openUncompleteSnackbar, setOpenUncompleteSnackbar] = useState(false);
    const [openFailSnackbar, setOpenFailSnackbar] = useState(false);

    // useEffect(() => {
    //     console.log({petData});
    // }, [petData]);

    const handleOpenReportForm = (petData) => {
        setPetData({
            id: petData.id,
            name: petData.name,
            userId: petData.userId
        });
        setReportFormOpen(true);
    };
    const handleCloseReportForm = () => {
        setReportFormOpen(false);
    };

    const handleNameValue = (e) => {
        e.preventDefault();
        setUserData({
            ...userData,
            reporter_name: e.target.value
        });
    }

    const handlePhoneValue = (e) => {
        e.preventDefault();
        setUserData({
            ...userData,
            phone: e.target.value
        })
    }

    const handleMessageValue = (e) => {
        e.preventDefault();
        setUserData({
            ...userData,
            message: e.target.value
        })
    }

    const handleSendClick = async(e) => {
        e.preventDefault();
        setOpenReload(true);

        if(!userData.reporter_name || !userData.phone || !userData.message){
            setOpenReload(false);
            setOpenUncompleteSnackbar(true);
            return;
        }

        const reportResponse = await createReport({
            reporter_name: userData.reporter_name,
            phone_number: userData.phone,
            message: userData.message,
            petId: petData.id,
            pet_name: petData.name,
            userId: petData.userId
        })
        if(reportResponse){
            setOpenReload(false);
            setOpenSuccessSnackbar(true);
            handleCloseReportForm();
        } else {
            setOpenReload(false);
            setOpenFailSnackbar(true);
        }
    }

    return (
        <ThemeProvider theme={homeCardTheme}>
            <Container disableGutters={true} className="homeCardContainer">
                <List className="listCard">
                    {petsFound.length > 0
                        ? petsFound.map((pet, index) => (
                            <ListItem className='listItem' disablePadding key={index}>
                                <Container disableGutters={true} className="card">
                                    <Container disableGutters={true} className="cardDetails">
                                        <Container disableGutters={true} className="titleContainer">
                                            <PetsIcon />
                                            <Typography variant="h4" className="cardTitle">
                                                {pet.name}
                                            </Typography>
                                        </Container>
                                        <Container disableGutters={true} className={pet.imageUrl.length < 2 ? imageClassName : pet.imageUrl.length === 2 ? css.containerOfTwoImages : pet.imageUrl.length === 3 ? css.containerOfThreeImages : css.containerOfFourImages } >
                                            {pet.imageUrl.map((url, index) => (
                                                <Box    component="img" 
                                                        key={index}
                                                        src={url}
                                                        alt={pet.name}
                                                        className={ pet.imageUrl.length < 2 ? css.imageStatic : '' } >
                                                </Box>
                                            ))}
                                        </Container>
                                        <Typography variant="body1" className="cardText">
                                            {pet.location}
                                        </Typography>
                                    </Container>
                                    <Button className="cardButton" 
                                            variant="contained"
                                            onClick={() => handleOpenReportForm(pet)} >
                                        Reportar
                                    </Button>
                                </Container>
                            </ListItem>
                        ))
                        :   <Container disableGutters={true} className="notFoundContainer">
                                <Box    component="img" 
                                        src="../../src/assets/notDog.png"
                                        sx={{ 
                                            width: {xs: '100px', sm: '130px', md: '160px'}, 
                                            height: {xs: '100px', sm: '130px', md: '160px'}, 
                                        }} >
                                </Box>
                                <Typography variant="h4" className="notFoundText"> 
                                    No hay mascotas reportadas cerca de tu ubicación
                                </Typography>
                            </Container>
                        }
                </List>
            </Container>
            <BootstrapDialog
                            open={reportFormOpen}
                            sx={{
                                m: {sm: 'auto'},
                                zIndex: 100
                                // backgroundColor: '#212121',
                            }} >
                    <Container className='secondaryContainer' >
                        <CustomButton 
                                    onClick={handleCloseReportForm}
                                    variant="text"
                                    className="closeButton" >
                            <CloseIcon />
                        </CustomButton>
                        <Typography
                                variant="h4"
                                className="reportTitle"
                                gutterBottom >
                            Enviar reporte de {petData?.name}
                        </Typography>
                    </Container>
                    <DialogContent 
                                // dividers 
                                className="dialogContent">
                        {/* <Box component="form"
                            onSubmit={handleSendClick}> */}
                        <CustomTextField onChange={handleNameValue}
                                        id="outlined-reporter-name"
                                        // className="reporterName"
                                        label="Nombre"
                                        placeholder="Ingresa tu nombre"
                                        name="reporter_name"
                                        InputLabelProps={{
                                            shrink: true,
                                        }} >
                        </CustomTextField>
                        <CustomTextField onChange={handlePhoneValue}
                                        id="outlined-reporter-name"
                                        // className="outlined-reporter-name"
                                        label="Teléfono"
                                        placeholder="Ejem: 8888-8888"
                                        name="phone_number"
                                        // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }} >
                        </CustomTextField>
                        <TextField
                                onChange={handleMessageValue}
                                id="outlined-multiline-static"
                                label="¿Dónde lo viste?"
                                multiline
                                rows={5}
                                name="message"
                                className="messageTextField"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                // placeholder=""
                                // defaultValue="Default Value"
                        />
                        {/* <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} /> */}
                        <CustomButton   
                                        // type="submit"
                                        sx={{ width: "100%" }}
                                        variant="contained"
                                        onClick={handleSendClick}
                                        >
                            Enviar información
                        </CustomButton>
                        {/* </Box> */}
                    </DialogContent>
                </BootstrapDialog>
                <CustomSnackbar open={openSuccessSnackbar} severity="success" onClose={setOpenSuccessSnackbar}>
                    Reporte enviado exitosamente!
                </CustomSnackbar>
                <CustomSnackbar open={openUncompleteSnackbar} severity="warning" onClose={setOpenUncompleteSnackbar}>
                    Falta información por completar!
                </CustomSnackbar>
                <CustomSnackbar open={openFailSnackbar} severity="error" onClose={setOpenFailSnackbar}>
                    Ha sucedido un error, intentalo de nuevo!
                </CustomSnackbar>
                <Backdrop
                    sx={{ color: '#fff', zIndex: 110 }}
                    open={openReload} >   
                    <CircularProgress color="inherit" />
                </Backdrop>
        </ThemeProvider>
    )
}