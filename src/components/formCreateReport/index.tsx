import React, {useEffect, useState} from 'react'
import { Box, Typography, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { MyDropzone } from '../dropzone';
import { Mapbox } from '../mapbox/mapbox';
import { DisplayImages } from '../displayImages';
import { CustomTextField } from "../../ui/textField";
import { CustomButton } from '../../ui/button';


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

export function FormCreateReport(){
    const [mapBoxFormData, setMapboxFormData] = useState(initialState);

    const [imagesUrl, setImagesUrl] = useState([]);

    const [deletedImages, setDeletedImages] = useState([]);

    const [btnDisable, setBtnDisable] = useState(false);

    const [finalImagesUrl, setFinalImagesUrl] = useState([]);

    const [openMapboxSnackbar, setOpenMapboxSnackbar] = useState(false);
    const [openImagesUrlSnackbar, setOpenImagesUrlSnackbar] = useState(false);

    const handleSnackbarClose = (setClose, event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setClose(false);
    };

    // useEffect(()=>{
    //     // if(imagesUrl.length >= 4){
    //     //     console.log('ya son 4');
    //     // }
    //     console.log('Cambiaron las imagesUrl en page: ', imagesUrl);
    // }, [imagesUrl])

    // useEffect(()=>{
    //     console.log('Cambiaron las FinalImagesUrl en page: ', finalImagesUrl);
    // }, [finalImagesUrl])

    useEffect(()=>{
        imagesUrl.length > 3 ? setBtnDisable(true) : setBtnDisable(false);
    }, [imagesUrl])

    // useEffect(()=>{
    //     setFilterForImages(imagesUrl.filter((item)=> {return finalImagesUrl.includes(item)}));
    // }, [imagesUrl])

    const handleDropzoneChange = (acceptedFiles) => {
        // console.log('acceptedFiles en pages: ', acceptedFiles);
        const imagesToDisplayImages = acceptedFiles.filter((item)=> {return !deletedImages.includes(item)});
        setImagesUrl(imagesToDisplayImages);
    }

    const handleDisplayChange = (deletedImages) => {
        // console.log('deletedImages en pages: ', deletedImages);
        setDeletedImages(prevUrls => [...prevUrls, ...deletedImages]);
        setImagesUrl(prevUrls => prevUrls.filter((item)=> {return !deletedImages.includes(item)}));
        // setFinalImagesUrl(deletedImages);
    }

    function handleMapboxChange(data) {
        setMapboxFormData({
            ...mapBoxFormData,
            mapbox: data,
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        if(imagesUrl.length === 0){
            setOpenImagesUrlSnackbar(true)
        } else {
            if(mapBoxFormData.mapbox.query === ''){
                setOpenMapboxSnackbar(true);
            } else {
                // const allData = {
                //     ...mapBoxFormData,
                //     petName: e.target.name.value,
                //     images: imagesUrl,
                // }
                console.log(e.target.name.value);        
                console.log('mapBoxFormData final: ', mapBoxFormData);
                console.log('imagesUrl final: ', imagesUrl);
            }
        }
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
                        // onChange={handleEmailandPasswordInputs}
                        // error={errorLabel} 
                        sx={{ 
                            color: 'white'
                        }} >
            </CustomTextField>
            <DisplayImages imagesReceived={imagesUrl} 
                            onChange={handleDisplayChange}
                            >
            </DisplayImages>
            <MyDropzone onChange={handleDropzoneChange} 
                        // imagesFromCreateReport={finalImagesUrl}
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
                        // defaultValue={locationName}
                        value={mapBoxFormData.mapbox.query}
                        id="outlined-location"
                        name="location"
                        label="Ubicación"
                        // onChange={handleEmailandPasswordInputs}
                        // error={errorLabel && isValidEmail === false}
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
            <Snackbar   open={openImagesUrlSnackbar} 
                        autoHideDuration={5000} 
                        onClose={() => handleSnackbarClose(setOpenImagesUrlSnackbar)} >
                <Alert  onClose={() => handleSnackbarClose(setOpenImagesUrlSnackbar)} 
                        severity="error" 
                        sx={{ width: '100%' }} >
                    Necesitas agregar al menos una foto!
                </Alert>
            </Snackbar>
        </Box>
    )
}


// const cloudName = "dpnltzaxy";
// const uploadPreset = "vvtvx8pc";
// let imgDataURL;

// export async function imgToURLCloudinary(imgData) {
//     try {
//         const formData = new FormData();
//         formData.append("file", imgData);
//         formData.append("upload_preset", uploadPreset);
//         const resp = await fetch(
//             "https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload",
//             {
//                 method: "POST",
//                 body: formData,
//             }
//         );
//         const data = await resp.json();
//         console.log("Upload successful:", data);
//         return data.url;
//     } catch (error) {
//         console.error("Upload error:", error);
//     }
// }