import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, Backdrop, CircularProgress, ThemeProvider } from '@mui/material';
import { MyDropzone } from '../dropzone';
import { Mapbox } from '../mapbox';
import { DisplayImages } from '../displayImages';
import { CustomTextField } from "../../ui/textField";
import { CustomButton } from '../../ui/button';
import { CustomSnackbar } from '../../ui/snackbar';
import { usePetReport, useCreatePetReport } from '../../hooks/createPetReport';
import { imgToURLCloudinary } from '../../lib/cloudinary';
import { formCreateReportTheme } from './themes';



type mapboxData = {
    mapbox: {
        query: string,
        coords: {
            lat: number,
            lng: number
        }
    }
}

const initialState: mapboxData = {
    mapbox: {
        query: '',
        coords: {
            lat: 0,
            lng: 0
        }
    }
}

export function FormCreateReport(){
    const [petReportData, setPetReportData] = usePetReport();

    const { createPetReport } = useCreatePetReport();

    const [mapBoxFormData, setMapboxFormData] = useState(initialState);

    const [imagesUrl, setImagesUrl] = useState([]);

    const [deletedImages, setDeletedImages] = useState([]);

    const [btnDisable, setBtnDisable] = useState(false);

    const [openReload, setOpenReload] = useState(false);

    const [openMapboxSnackbar, setOpenMapboxSnackbar] = useState(false);
    const [openImagesUrlSnackbar, setOpenImagesUrlSnackbar] = useState(false);
    const [openUndefinedMapboxSnackbar, setOpenUndefinedMapboxSnackbar] = useState(false);
    const [openNoTokenSnackbar, setOpenNoTokenSnackbar] = useState(false);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openFailSnackbar, setOpenFailSnackbar] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        imagesUrl.length > 3 ? setBtnDisable(true) : setBtnDisable(false);
    }, [imagesUrl])

    const handleDropzoneChange = (acceptedFiles) => {
        const imagesToDisplayImages = acceptedFiles.filter((item)=> {return !deletedImages.includes(item)});
        setImagesUrl(imagesToDisplayImages);
    }

    const handleDisplayChange = (deletedImages) => {
        setDeletedImages(prevUrls => [...prevUrls, ...deletedImages]);
        setImagesUrl(prevUrls => prevUrls.filter((item)=> {return !deletedImages.includes(item)}));
    }

    function handleMapboxChange(data) {
        setMapboxFormData({
            ...mapBoxFormData,
            mapbox: data,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setOpenReload(true);
        
        if(imagesUrl.length === 0){
            setOpenImagesUrlSnackbar(true)
            setOpenReload(false);
            return;
        } 

        if(mapBoxFormData.mapbox.query === ''){
            setOpenMapboxSnackbar(true);
            setOpenReload(false);
            return;
        }
        
        const latLng: any = mapBoxFormData.mapbox.coords;
        if(latLng.newLat === undefined){
            setOpenUndefinedMapboxSnackbar(true);
            setOpenReload(false);
            return;
        } 

        const userToken = localStorage.getItem("user_token");
        if(!userToken){
            setOpenNoTokenSnackbar(true);
            setOpenReload(false);
            return;
        }

        const imagesUrlCloudinary: string[] = await imgToURLCloudinary(imagesUrl);
        const allData = {
            last_lat: latLng.newLat,
            last_lng: latLng.newLng,
            name: e.target.name.value,
            imageUrl: imagesUrlCloudinary,
            status: 'missing',
            location: mapBoxFormData.mapbox.query
        }
        setPetReportData(allData);
        const createResponse = await createPetReport(allData);
        if (createResponse) {
            setOpenSuccessSnackbar(true);
            setTimeout(() => {
                setOpenReload(false);
                navigate("/user-reports", {replace: true});
            }, 2500);
        } else {
            setOpenReload(false);
            setOpenFailSnackbar(true);
        }
    }

    const handleCancelBtn = (e) => {
        e.preventDefault();
        const form = e.target.closest('form');
        if (form) {
            form.reset();
        }
        navigate("/menu");
    }

    return (
        <ThemeProvider theme={formCreateReportTheme}>
            <Box    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: {xs: '15px', sm: '25px', md: '15px', lg: '20px'},
                        width: '100%',
                    }} >
                <CustomTextField  
                            required={true}
                            id="outlined-pet-name"
                            className="outlined-pet-name"
                            defaultValue="Normal"
                            label="Nombre"
                            placeholder="Ingresa el nombre de la mascota"
                            name="name"
                            sx={{ color: '#fff' }} >
                </CustomTextField>
                <DisplayImages imagesReceived={imagesUrl} 
                                onChange={handleDisplayChange}
                />
                <MyDropzone onChange={handleDropzoneChange} 
                            disabled={btnDisable} 
                />
                <Typography variant="body2" className="dropzoneText" >
                    * Puedes agregar hasta 4 fotos
                </Typography>
                <Mapbox onChange={handleMapboxChange} />
                <Typography variant="body1" className="mapboxText" >
                    Buscá un punto de referencia para reportar la mascota. Por ejemplo, la ubicación donde lo viste por última vez.
                </Typography>
                <CustomTextField 
                            disabled
                            required
                            value={mapBoxFormData.mapbox.query}
                            id="outlined-location"
                            name="location"
                            label="Ubicación"
                            InputLabelProps={{ shrink: true }} >
                </CustomTextField>
                <Container disableGutters={true} className="buttonsContainer" >
                    <CustomButton   type="submit" 
                                    variant="contained"
                                    className="submitButton" >
                        Crear reporte
                    </CustomButton>
                    <CustomButton   variant="contained"
                                    onClick={handleCancelBtn}
                                    className="cancelButton" >
                        Cancelar
                    </CustomButton>
                </Container>
                <CustomSnackbar open={openMapboxSnackbar} severity="error" onClose={setOpenMapboxSnackbar}>
                    Necesitas agregar una dirección!
                </CustomSnackbar>
                <CustomSnackbar open={openUndefinedMapboxSnackbar} severity="error" onClose={setOpenUndefinedMapboxSnackbar}>
                    Necesitas elegir una ubicación más especifica!
                </CustomSnackbar>
                <CustomSnackbar open={openImagesUrlSnackbar} severity="error" onClose={setOpenImagesUrlSnackbar}>
                    Necesitas agregar al menos una foto!
                </CustomSnackbar>
                <CustomSnackbar open={openNoTokenSnackbar} severity="error" onClose={setOpenNoTokenSnackbar}>
                    No tienes los permisos para crear reportes!
                </CustomSnackbar>
                <CustomSnackbar open={openSuccessSnackbar} severity="success" onClose={setOpenSuccessSnackbar}>
                    Reporte creado!
                </CustomSnackbar>
                <CustomSnackbar open={openFailSnackbar} severity="error" onClose={setOpenFailSnackbar}>
                    Ha sucedido un error, intentalo de nuevo!
                </CustomSnackbar>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={openReload} >   
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Box>
        </ThemeProvider>
    )
}