import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Box, 
    Container, 
    Typography,
    Backdrop, 
    CircularProgress,
    ThemeProvider } from '@mui/material';
import { MyDropzone } from '../dropzone';
import { Mapbox } from '../mapbox';
import { DisplayImages } from '../displayImages';
import { CustomTextField } from "../../ui/textField";
import { CustomButton } from '../../ui/button';
import { CustomSnackbar } from '../../ui/snackbar';
import { useGetDataOfPet } from '../../hooks/dataOfPet';
import { useUpdatePetData } from '../../hooks/editPetData';
import { useDeleteReport } from '../../hooks/deleteReport';
import { imgToURLCloudinary } from '../../lib/cloudinary';
import { formEditReportTheme } from './themes';


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
    const { getDataOfPet } = useGetDataOfPet();
    const { updatePetData } = useUpdatePetData();
    const { deleteReport } = useDeleteReport();
    // const [dataStore, setDataStore] = usePetDataStore();

    const [mapBoxFormData, setMapboxFormData] = useState(initialState);

    // const [nameValue, setNameValue] = useState('');

    const [idOfPet, setIdOfPet] = useState(0);

    const [imagesUrl, setImagesUrl] = useState([]);

    const [deletedImages, setDeletedImages] = useState([]);

    const [btnDisable, setBtnDisable] = useState(false);

    const [openReload, setOpenReload] = useState(false);

    // const [eventNameFullFilled, setNameFullFilled] = useState(false);
    // const [eventLocationFullFilled, setLocationFullFilled] = useState(false);

    const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);
    const [openImagesUrlSnackbar, setOpenImagesUrlSnackbar] = useState(false);
    const [openUndefinedMapboxSnackbar, setOpenUndefinedMapboxSnackbar] = useState(false);
    const [openNoTokenSnackbar, setOpenNoTokenSnackbar] = useState(false);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openFailSnackbar, setOpenFailSnackbar] = useState(false);

    const navigate = useNavigate();

    const pullData = async() => {
        const form: HTMLFormElement = document.querySelector('.form');
        const dataResponse = await getDataOfPet();
        // console.log({dataResponse});
        
        if(!dataResponse){
            return false;
        }

        setIdOfPet(dataResponse.id);
        form.pet_name.value = dataResponse.name;
        setMapboxFormData({
            ...mapBoxFormData,
            mapbox: {
                query: dataResponse.location,
                coords: {
                    lat: dataResponse.last_lat,
                    lng: dataResponse.last_lng
            }
        }});
        setImagesUrl(dataResponse.imageUrl);
        return true;
    }

    useEffect(()=>{
        pullData();
    }, [])

    useEffect(()=>{
        // console.log('imagesUrl en editReport', imagesUrl);
        imagesUrl.length > 3 ? setBtnDisable(true) : setBtnDisable(false);
    }, [imagesUrl])

    const handleDropzoneChange = (acceptedFiles) => {
        const imagesDeletedVerified = acceptedFiles.filter((item)=> {return !deletedImages.includes(item)});
        // console.log({imagesDeletedVerified});
        const finalVerification = imagesDeletedVerified.filter((item)=> {return !imagesUrl.includes(item)});
        setImagesUrl(prevUrls => [...prevUrls, ...finalVerification]);
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

        // if(mapBoxFormData.mapbox.query === ''){
        //     // setOpenMapboxSnackbar(true);
        //     setOpenReload(false);
        //     return;
        // }
        
        // console.log({mapBoxFormData});
        const latLng: any = mapBoxFormData.mapbox.coords;
        if(latLng.lat === undefined){
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

        const imagesWithoutClodinary = imagesUrl.filter((item)=> {return !item.includes('cloudinary')});
        const imagesWithCloudinary: string[] = imagesUrl.filter((item)=> {return item.includes('cloudinary')});
        const imagesUrlCloudinary: string[] = await imgToURLCloudinary(imagesWithoutClodinary);
        imagesWithCloudinary.push(...imagesUrlCloudinary);
        // console.log({imagesWithCloudinary});

        const petData = {
            id: idOfPet,
            last_lat: latLng.lat,
            last_lng: latLng.lng,
            name: e.target.pet_name.value,
            imageUrl: imagesWithCloudinary,
            status: 'missing',
            location: mapBoxFormData.mapbox.query
        }
        // console.log(allPetData);

        const updateResponse = await updatePetData(petData);
        if (updateResponse) {
            // console.log('Pet actualizada: ', updateResponse);
            setOpenSuccessSnackbar(true);
            setTimeout(() => {
                setOpenReload(false);
                navigate("/user-reports");
            }, 2500);
        } else {
            // console.log('Error al actualizar pet', updateResponse);
            setOpenReload(false);
            setOpenFailSnackbar(true);
        }
    }

    const handleFoundBtn = (e) => {
        e.preventDefault();
        setOpenReload(true);

        const deleteResponse = deleteReport(idOfPet);
        if (deleteResponse) {
            setOpenDeleteSnackbar(true);
            setTimeout(() => {
                setOpenReload(false);
                navigate("/user-reports");
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
        navigate("/user-reports");
    }

    return (
        <ThemeProvider theme={formEditReportTheme}>
            <Box    component="form"
                    onSubmit={handleSubmit}
                    className="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: {xs: '15px', sm: '25px', md: '15px', lg: '20px'},
                        width: '100%',
                    }} >
                <CustomTextField 
                            id="outlined-pet-name"
                            className="outlined-pet-name"
                            label="Nombre"
                            placeholder="Ingresa el nombre de la mascota"
                            name="pet_name"
                            InputLabelProps={{
                                shrink: true,
                            }} >
                </CustomTextField>
                <DisplayImages  imagesReceived={imagesUrl} 
                                onChange={handleDisplayChange} 
                />
                <MyDropzone onChange={handleDropzoneChange} 
                            disabled={btnDisable} 
                />
                <Typography variant='h3' className="dropzoneText" >
                    * Puedes agregar hasta 4 fotos
                </Typography>
                <Mapbox onChange={handleMapboxChange} />
                <Typography variant='h3' className="mapboxText" >
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
                <Container disableGutters={true} className="buttonsContainer">
                    <CustomButton   type="submit" 
                                    variant="contained"
                                    className="createButton" >
                        Guardar
                    </CustomButton>
                    <CustomButton   variant="contained"
                                    className="foundButton" 
                                    onClick={handleFoundBtn} >
                        Reportar como encontrado
                    </CustomButton>
                    <CustomButton   variant="contained"
                                    className="deleteButton" 
                                    onClick={handleCancelBtn} >
                        Cancelar
                    </CustomButton>
                </Container>
                <CustomSnackbar open={openUndefinedMapboxSnackbar} severity="error" onClose={setOpenUndefinedMapboxSnackbar}>
                    Necesitas elegir una ubicación más especifica!
                </CustomSnackbar>
                <CustomSnackbar open={openImagesUrlSnackbar} severity="error" onClose={setOpenImagesUrlSnackbar}>
                    Necesitas agregar al menos una foto!
                </CustomSnackbar>
                <CustomSnackbar open={openNoTokenSnackbar} severity="error" onClose={setOpenNoTokenSnackbar}>
                    No tienes los permisos para crear reportes!
                </CustomSnackbar>
                <CustomSnackbar open={openDeleteSnackbar} severity="success" onClose={setOpenDeleteSnackbar}>
                    Reporte borrado exitosamente!
                </CustomSnackbar>
                <CustomSnackbar open={openSuccessSnackbar} severity="success" onClose={setOpenSuccessSnackbar}>
                    Reporte editado!
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