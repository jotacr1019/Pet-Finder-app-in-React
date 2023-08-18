import React from "react";
import Button from '@mui/material/Button';
import { CustomButton } from "../../ui/button";



export function LocationData(){
    return <Button sx={{ width: '100%', 
                        backgroundColor: '#191970',
                        '&:hover': {
                            backgroundColor: '#00004e',
                        } }} 
                    variant="contained" 
                    size="large">
        Dar mi ubicación actual
    </Button>
}

// 

// btnLocation.addEventListener("click", async (e) => {
//     e.preventDefault();
//     (async function getCurrentLocation() {
//         try {
//             const currentLocation: any = await getLocationOfUser();
//             state.setLocationOfUser(
//                 currentLocation.lat,
//                 currentLocation.lng
//             );
//             spanWaitEl.style.display = "flex";
//             spanWaitEl.classList.add("full-screen");
//             btnLocation.style.pointerEvents = "none";
//             btnInfo.style.pointerEvents = "none";
//             datosEl.style.pointerEvents = "none";
//             datosBtnEl.style.pointerEvents = "none";
//             reportesEl.style.pointerEvents = "none";
//             reportesBtnEl.style.pointerEvents = "none";
//             reportarEl.style.pointerEvents = "none";
//             reportarBtnEl.style.pointerEvents = "none";

//             const petsFound = await state.getPetsAroundZone(
//                 currentLocation.lat,
//                 currentLocation.lng
//             );
//             if (petsFound.length > 0) {
//                 currentState.petsAroundUser = petsFound;
//                 state.setState(currentState);
//                 setTimeout(() => {
//                     params.goTo("/home");
//                 }, 1000);
//             } else {
//                 spanWaitEl.style.display = "none";
//                 spanEmptyEl.style.display = "flex";
//                 spanEmptyEl.classList.add("full-screen-empty");
//             }
//         } catch (error) {
//             console.log(error);
//             spanWaitEl.style.display = "none";
//             btnLocation.style.display = "none";
//             formEl.style.display = "flex";
//             formEl.style.width = "100%";
//         }
//     })();
// });

// 

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