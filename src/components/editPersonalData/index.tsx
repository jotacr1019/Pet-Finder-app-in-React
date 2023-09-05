import React, { useEffect, useState } from "react";
import { Box, Container, Snackbar, Collapse, ThemeProvider } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import isEmail from 'validator/lib/isEmail';
import { CustomTextField } from "../../ui/textField";
import { useUserDataUpdated, useUpdateUserInDB } from "../../hooks/updateUserData";
import { useBtnPasswordDisabledState,
    useBtnDataDisabledState,
    useBackdropFilterState } from "../../atoms";
import { getDataOfUserFromDB } from "../../lib/api";
import { editPersonalDataTheme } from "./themes";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function CustomEditData(){
    const [personalData, setPersonalData] = useUserDataUpdated();
    const {updateUser} = useUpdateUserInDB()

    const [btnDataDisabled, setBtnDataDisabled] = useBtnDataDisabledState();
    const [btnPasswordDisabled, setBtnPasswordDisabled] = useBtnPasswordDisabledState();
    const [backDropFilter, setBackDropFilter] = useBackdropFilterState();

    const [btnDataloading, setBtnDataLoading] = useState(false);
    const [btnSaveLoading, setBtnSaveLoading] = useState(false);

    const [collapseDataChecked, setCollapseDataChecked] = useState(false);

    const [buttonDataDisplay, setButtonDataDisplay] = useState('initial')
    const [displayDivData, setDisplayDivData] = useState('none');
    const [btnSaveDataDisabled, setBtnSaveDataDisabled] = useState(true);
    
    const [errorLabel, setErrorLabel] = useState(false);

    const [isValidEmail, setIsValidEmail] = useState(false);

    const [openTokenSnackbar, setOpenTokenSnackbar] = useState(false);
    const [openFailSnackbar, setOpenFailSnackbar] = useState(false);
    const [openEmailSnackbar, setOpenEmailSnackbar] = useState(false);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openUnsuccessSnackbar, setOpenUnsuccessSnackbar] = useState(false);

    const [eventNameFullFilled, setNameFullFilled] = useState(false);
    const [eventEmailFullFilled, setEmailFullFilled] = useState(false);

    const [editDataBtnColor, setEditDataBtnColor] = useState('#fff');
    const [btnSaveDataColor, setBtnSaveDataColor] = useState('rgba(0, 0, 0, 0.26)');

    useEffect(() => {
        setEditDataBtnColor(btnDataDisabled === true ? 'rgba(0, 0, 0, 0.26)' : '#fff');
    }, [btnDataDisabled])

    useEffect(() => {
        setBtnSaveDataDisabled(eventNameFullFilled && eventEmailFullFilled ? false : true);
        setBtnSaveDataColor(eventNameFullFilled && eventEmailFullFilled ? '#fff' : 'rgba(0, 0, 0, 0.26)');
    }, [eventNameFullFilled, eventEmailFullFilled])

    const handleInputsCompletation = (event, id) => {
        if (id === 'outlined-name') {
            setNameFullFilled(Boolean(event.target.value.length));
        } 
        if (id === 'outlined-email') {
            setEmailFullFilled(Boolean(event.target.value.length));
        }
    };

    const handleSnackbarClose = (setClose, event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setClose(false);
    };

    const pullData = async(token) => {
        const form: HTMLFormElement = document.querySelector('.formData');
        const dataResponse = await getDataOfUserFromDB(token);
        
        if(!dataResponse){
            return false;
        }

        form.full_name.value = dataResponse.full_name;
        form.email.value = dataResponse.email;
        setNameFullFilled(true);
        setEmailFullFilled(true);
        return true;
    }

    const handleDataChange = async () => {
        setBtnDataLoading(true);
        setBtnPasswordDisabled(true);
        const userToken = localStorage.getItem("user_token");

        if(!userToken){
            setBtnDataLoading(false);
            setBtnPasswordDisabled(false);
            setOpenTokenSnackbar(true);
            return;
        }

        const response = await pullData(userToken)

        if(!response){
            setBtnDataLoading(false);
            setBtnPasswordDisabled(false);
            setOpenUnsuccessSnackbar(true);
            return;
        }

        setBtnSaveDataDisabled(false);
        setBtnDataLoading(false);
        setDisplayDivData('flex')
        setBackDropFilter('brightness(0.5)')
        setCollapseDataChecked(true);
        setButtonDataDisplay('none');
    }

    const handleDataSubmit = async(e) => {
        e.preventDefault();
        setBtnSaveLoading(true);
        const full_name = e.target.full_name.value;
        const email = e.target.email.value;

        if(!isEmail(e.target.email.value)){
            setOpenEmailSnackbar(true);
            setIsValidEmail(false);
            setErrorLabel(true);
            setBtnSaveLoading(false);
            return;
        }

        setIsValidEmail(true);
        setErrorLabel(false);
        setPersonalData({full_name, email});
        
        const response = await updateUser({full_name, email});
        if (response){
            setOpenSuccessSnackbar(true);
            setBtnPasswordDisabled(false);
            setDisplayDivData('flex')
            setCollapseDataChecked(false);
            setBackDropFilter('none');
            setButtonDataDisplay('initial');
            setBtnSaveLoading(false);
        } else {
            setOpenFailSnackbar(true);
        }
    }

    return <ThemeProvider theme={editPersonalDataTheme}>      
                <Container disableGutters={true} className="principalDataContainer" >
                    <LoadingButton  
                            disabled={btnDataDisabled}
                            variant="outlined"
                            className='editDataButton'
                            onClick={handleDataChange} 
                            sx={{ 
                                display: buttonDataDisplay,
                                color: editDataBtnColor
                            }}
                            loading={btnDataloading}
                            loadingPosition='center'
                            loadingIndicator={<span style={{color: 'white' }}>
                                                Espere...
                                            </span>} >
                        Modificar datos personales
                    </LoadingButton>
                    <Collapse   in={collapseDataChecked} >
                        <Container  className="secondaryDataContainer"
                                    disableGutters={true}
                                    sx={{ display: displayDivData }} >
                            <Container  className="formDataContainer" 
                                        disableGutters={true}>
                                {<Box   component='form'
                                        className='formData'    
                                        onSubmit={handleDataSubmit} >
                                    <CustomTextField
                                        id="outlined-name"
                                        label="Nombre"
                                        placeholder="Ingresa un nombre"
                                        name="full_name"
                                        onChange={(event) => handleInputsCompletation(event, 'outlined-name')}
                                    />
                                    <CustomTextField
                                        id="outlined-email"
                                        label="Email"
                                        placeholder="ejemplo@mail.com"
                                        name="email"
                                        onChange={(event) => handleInputsCompletation(event, 'outlined-email')}
                                        error={errorLabel && isValidEmail === false} 
                                    />
                                    <LoadingButton  
                                                disabled={btnSaveDataDisabled}
                                                type="submit"
                                                variant="text"
                                                className="submitDataButton"
                                                sx={{ color: btnSaveDataColor }}
                                                loading={btnSaveLoading}
                                                loadingIndicator={<span style={{color: 'white', textAlign: 'center'}}>
                                                                    Espere...
                                                                </span>}
                                                startIcon={<SaveIcon />} 
                                                loadingPosition='center' >
                                        Guardar
                                    </LoadingButton>
                                </Box>}
                            </Container>
                        </Container>
                    </Collapse>
                    <Snackbar   open={openEmailSnackbar} 
                                autoHideDuration={5000} 
                                onClose={() => handleSnackbarClose(setOpenEmailSnackbar)} >
                        <Alert  onClose={() => handleSnackbarClose(setOpenEmailSnackbar)} 
                                severity="error" 
                                sx={{ width: '100%' }} >
                            No es un formato de correo válido!
                        </Alert>
                    </Snackbar>
                    <Snackbar   open={openTokenSnackbar} 
                                autoHideDuration={5000} 
                                onClose={() => handleSnackbarClose(setOpenTokenSnackbar)} >
                        <Alert  onClose={() => handleSnackbarClose(setOpenTokenSnackbar)} 
                                severity="error" 
                                sx={{ width: '100%' }} >
                            No tienes los permisos para esta acción!
                        </Alert>
                    </Snackbar>
                    <Snackbar   open={openSuccessSnackbar} 
                                autoHideDuration={5000} 
                                onClose={() => handleSnackbarClose(setOpenSuccessSnackbar)} >
                        <Alert  onClose={() => handleSnackbarClose(setOpenSuccessSnackbar)} 
                                severity="success" 
                                sx={{ width: '100%' }} >
                            Los datos han sido actualizados!
                        </Alert>
                    </Snackbar>
                    <Snackbar   open={openUnsuccessSnackbar} 
                                autoHideDuration={5000} 
                                onClose={() => handleSnackbarClose(setOpenUnsuccessSnackbar)} >
                        <Alert  onClose={() => handleSnackbarClose(setOpenUnsuccessSnackbar)} 
                                severity="error" 
                                sx={{ width: '100%' }} >
                            Ha ocurrido un error, intenta nuevamente!
                        </Alert>
                    </Snackbar>
                    <Snackbar   open={openFailSnackbar} 
                                autoHideDuration={5000} 
                                onClose={() => handleSnackbarClose(setOpenFailSnackbar)} >
                        <Alert  onClose={() => handleSnackbarClose(setOpenFailSnackbar)} 
                                severity="error" 
                                sx={{ width: '100%' }} >
                            Ha ocurrido un error, datos no actualizados!
                        </Alert>
                    </Snackbar>
                </Container>
            </ThemeProvider>
}