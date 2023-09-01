import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Box, Typography, Snackbar, Backdrop, CircularProgress } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { MyDropzone } from '../dropzone';
import { Mapbox } from '../mapbox';
import { DisplayImages } from '../displayImages';
import { CustomTextField } from "../../ui/textField";
import { CustomButton } from '../../ui/button';
import { usePetReport, useCreatePetReport } from '../../hooks/createPetReport';
import { imgToURLCloudinary } from '../../lib/cloudinary';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

export function FormEditReport(){
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

    const handleSnackbarClose = (setClose, event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setClose(false);
    };

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
            console.log('Pet creada: ', createResponse);
            setOpenSuccessSnackbar(true);
            setTimeout(() => {
                setOpenReload(false);
                navigate("/user-reports");
            }, 2500);
        } else {
            console.log('Error al crear pet', createResponse);
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
                        sx={{ 
                            color: 'white'
                        }} >
            </CustomTextField>
            <DisplayImages imagesReceived={imagesUrl} 
                            onChange={handleDisplayChange}
                            >
            </DisplayImages>
            <MyDropzone onChange={handleDropzoneChange} 
                        disabled={btnDisable} 
            />
            <Typography sx={{   
                            fontSize: {xs: '0.8rem', sm: '0.8rem', md: '0.9rem', lg: '1rem'},
                            marginBottom: {xs: '26px', md: '36px', lg: '40px'},
                            marginTop: {xs: '-44px', sm: '-36px', md: '-26px', lg: '-32px'},
                            textAlign: 'center',
                            color: '#fff'
                        }} >
                * Puedes agregar hasta 4 fotos
            </Typography>
            <Mapbox onChange={handleMapboxChange} />
            <Typography sx={{   
                            fontSize: {xs: '0.9rem', sm: '1rem', md: '1.2rem', lg: '1.4rem'},
                            marginBottom: {xs: '14px', sm: '16px', md: '20px', lg: '22px'},
                            marginTop: {xs: '-20px', sm: '-30px', md: '-26px', lg: '-32px'},
                            textAlign: 'center',
                            color: '#fff'
                        }} >
                Buscá un punto de referencia para reportar la mascota. Por ejemplo, la ubicación donde lo viste por última vez.
            </Typography>
            <CustomTextField 
                        disabled
                        required
                        value={mapBoxFormData.mapbox.query}
                        id="outlined-location"
                        name="location"
                        label="Ubicación"
                        InputLabelProps={{
                            shrink: true,
                        }} >
            </CustomTextField>
            <Box    sx={{
                        display: 'flex',
                        flexDirection: {xs: 'column', md: 'row'}, 
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: {xs: '20px', sm: '22px', md: '60px', lg: '60px'},
                        marginTop: {xs: '50px', sm: '45px', md: '70px', lg: '90px'},
                        width: {xs: '100%', md: '70%'},
                    }} >
                <CustomButton   type="submit" 
                                variant="contained"
                                sx={{ width: '100%',
                                    backgroundColor: '#191970',
                                    fontSize: {lg: '1.2rem'},
                                    '&:hover': {
                                        backgroundColor: '#00004e'
                                    }
                                }} >
                    Crear reporte
                </CustomButton>
                <CustomButton   variant="contained"
                                onClick={handleCancelBtn}
                                sx={{ width: '100%',
                                    backgroundColor: '#91323b',
                                    '&:hover': {
                                        backgroundColor: '#891722'
                                    },
                                    fontSize: {lg: '1.2rem'}
                                }} >
                    Cancelar
                </CustomButton>
            </Box>
            <Snackbar   open={openMapboxSnackbar} 
                        autoHideDuration={5000} 
                        onClose={() => handleSnackbarClose(setOpenMapboxSnackbar)} >
                <Alert  onClose={() => handleSnackbarClose(setOpenMapboxSnackbar)} 
                        severity="error" 
                        sx={{ width: '100%' }} >
                    Necesitas agregar una dirección!
                </Alert>
            </Snackbar>
            <Snackbar   open={openUndefinedMapboxSnackbar} 
                        autoHideDuration={5000} 
                        onClose={() => handleSnackbarClose(setOpenUndefinedMapboxSnackbar)} >
                <Alert  onClose={() => handleSnackbarClose(setOpenUndefinedMapboxSnackbar)} 
                        severity="error" 
                        sx={{ width: '100%' }} >
                    Necesitas elegir una ubicación más especifica!
                </Alert>
            </Snackbar>
            <Snackbar   open={openImagesUrlSnackbar} 
                        autoHideDuration={5000} 
                        onClose={() => handleSnackbarClose(setOpenImagesUrlSnackbar)} >
                <Alert  onClose={() => handleSnackbarClose(setOpenImagesUrlSnackbar)} 
                        severity="error" 
                        sx={{ width: '100%' }} >
                    Necesitas agregar al menos una foto!
                </Alert>
            </Snackbar>
            <Snackbar   open={openNoTokenSnackbar} 
                        autoHideDuration={5000} 
                        onClose={() => handleSnackbarClose(setOpenNoTokenSnackbar)} >
                <Alert  onClose={() => handleSnackbarClose(setOpenNoTokenSnackbar)} 
                        severity="error" 
                        sx={{ width: '100%' }} >
                    No tienes los permisos para crear reportes!
                </Alert>
            </Snackbar>
            <Snackbar   open={openSuccessSnackbar} 
                        autoHideDuration={5000} 
                        onClose={() => handleSnackbarClose(setOpenSuccessSnackbar)} >
                <Alert  onClose={() => handleSnackbarClose(setOpenSuccessSnackbar)} 
                        severity="success" 
                        sx={{ width: '100%' }} >
                    Reporte creado!
                </Alert>
            </Snackbar>
            <Snackbar   open={openFailSnackbar} 
                        autoHideDuration={5000} 
                        onClose={() => handleSnackbarClose(setOpenFailSnackbar)} >
                <Alert  onClose={() => handleSnackbarClose(setOpenFailSnackbar)} 
                        severity="error" 
                        sx={{ width: '100%' }} >
                    Reporte creado!
                </Alert>
            </Snackbar>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openReload} >   
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    )
}