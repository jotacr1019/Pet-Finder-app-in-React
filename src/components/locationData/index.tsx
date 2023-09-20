import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, 
    ThemeProvider, 
    Container, 
    TextField, 
    InputAdornment, 
    Dialog } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Mapbox } from "../../components/mapbox";
import { CustomSnackbar } from "../../ui/snackbar";
import { CustomButton } from "../../ui/button";
import { locationButtonTheme } from "./themes";


type mapboxData = {
    mapbox: {
        query: string,
        coords: {
            newLat: number,
            newLng: number
        }
    }
}

const initialState: mapboxData = {
    mapbox: {
        query: '',
        coords: {
            newLat: 0,
            newLng: 0
        }
    }
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

async function getLocationOfUser() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(false);
        }
        const onUbicacionConcedida = (location) => {
            const coords = location.coords;
            resolve({ lat: coords.latitude, lng: coords.longitude });
        };
        const onErrorDeUbicacion = (err) => {
            console.log("Error obteniendo ubicación: ", err);
            reject(false);
        };
        navigator.geolocation.getCurrentPosition(
            onUbicacionConcedida,
            onErrorDeUbicacion
        );
    });
}

export function LocationData(){
    const [query, setQuery] = useState("");

    const [mapBoxFormData, setMapboxFormData] = useState(initialState);

    const [mapboxOpen, setMapboxOpen] = useState(false);

    const [btnSearchDisabled, setBtnSearchDisabled] = useState(false);

    const [openFailSnackbar, setOpenFailSnackbar] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setQuery(mapBoxFormData.mapbox.query);
    }, [mapBoxFormData])

    useEffect(() => {
        query !== "" ? setBtnSearchDisabled(false) : setBtnSearchDisabled(true);
    }, [query])

    const handleClick = async() => {
        try{
            const response: any = await getLocationOfUser();
            const lat = response.lat;
            const lng = response.lng;
            navigate(`/home/location=lat=${lat}&lng=${lng}`);
        }
        catch(err){
            console.log(err);
            setMapboxOpen(true);
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        const lat = mapBoxFormData.mapbox.coords.newLat;
        const lng = mapBoxFormData.mapbox.coords.newLng;
        navigate(`/home/location=lat=${lat}&lng=${lng}`);
    }

    function handleMapboxChange(data) {
        setMapboxFormData({
            ...mapBoxFormData,
            mapbox: data,
        });
        data.query === "" ? setOpenFailSnackbar(true) : setOpenFailSnackbar(false);
    }

    const handleClose = () => {
        setMapboxOpen(false);
    };

    return  (
        <ThemeProvider theme={locationButtonTheme}>
            <Container disableGutters={true} className="locationContainer">
                <CustomButton   className="locationButton"
                                onClick={handleClick}
                                variant="contained" 
                                size="large">
                    Dar mi ubicación actual
                </CustomButton>
                <BootstrapDialog    open={mapboxOpen}
                                    sx={{ m: {sm: 'auto'}, width: '100%' }} >
                    <Container disableGutters={true} className='mapboxContainer' >
                        <CustomButton 
                                    onClick={handleClose}
                                    variant="outlined"
                                    className="closeButton" >
                            Cerrar
                        </CustomButton>
                        <Mapbox onChange={handleMapboxChange}></Mapbox>
                        <Container className="searchContainer" disableGutters={true} >
                            <TextField
                                disabled
                                id="location-search"
                                placeholder="Ubicación"
                                value={query}
                                className="searchInput"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <Button 
                                                    disabled={btnSearchDisabled}
                                                    onClick={handleSearch}
                                                    type="submit"
                                                    variant="contained"
                                                    className="searchButton" >
                                                Buscar
                                            </Button>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Container>
                    </Container>
                </BootstrapDialog>
            </Container>
            <CustomSnackbar open={openFailSnackbar} severity="warning" onClose={setOpenFailSnackbar}>
                Intenta con otra dirección!
            </CustomSnackbar>
        </ThemeProvider> )
}