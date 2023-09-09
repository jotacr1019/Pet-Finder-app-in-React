import React, { useEffect, useState } from "react";
import { Box, Container, Snackbar, Collapse, ThemeProvider } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { CustomPasswordField } from "../../ui/passwordField";
import { usePasswordUserInDB } from "../../hooks/updatePassword";
import { useBtnPasswordDisabledState, 
    useBtnDataDisabledState,
    useBackdropFilterState } from "../../atoms";
import { editPasswordTheme } from "./themes";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function CustomEditPassword(){
    const {updatePassword} = usePasswordUserInDB()

    const [btnDataDisabled, setBtnDataDisabled] = useBtnDataDisabledState();
    const [btnPasswordDisabled, setBtnPasswordDisabled] = useBtnPasswordDisabledState();
    const [backDropFilter, setBackDropFilter] = useBackdropFilterState();

    const [collapsePasswordChecked, setCollapsePasswordChecked] = useState(false);

    const [buttonPasswordDisplay, setButtonPasswordDisplay] = useState('initial')

    const [displayDivPassword, setDisplayDivPassword] = useState('none');

    const [btnSaveloading, setBtnSaveLoading] = useState(false);

    const [eventPasswordFullFilled, setPasswordFullFilled] = useState(false);
    const [eventConfirmPasswordFullFilled, setConfirmPasswordFullFilled] = useState(false);

    const [openTokenSnackbar, setOpenTokenSnackbar] = useState(false);
    const [openPasswordSnackbar, setOpenPasswordSnackbar] = useState(false);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openFailSnackbar, setOpenFailSnackbar] = useState(false);

    const [btnSavePasswordDisabled, setBtnSavePasswordDisabled] = useState(true);
    const [btnCancelDisabled, setBtnCancelDisabled] = useState(false);

    const [editPasswordBtnColor, setEditPasswordBtnColor] = useState('#fff');
    const [btnSaveColor, setBtnSaveColor] = useState('rgba(0, 0, 0, 0.26)');
    const [btnCancelColor, setBtnCancelColor] = useState('#fff');

    useEffect(() => {
        setEditPasswordBtnColor(btnPasswordDisabled === true ? 'rgba(0, 0, 0, 0.26)' : '#fff');
    }, [btnPasswordDisabled])

    useEffect(() => {
        setBtnSavePasswordDisabled(eventPasswordFullFilled && eventConfirmPasswordFullFilled ? false : true);
        setBtnSaveColor(eventPasswordFullFilled && eventConfirmPasswordFullFilled ? '#fff' : 'rgba(0, 0, 0, 0.26)');
    }, [eventPasswordFullFilled, eventConfirmPasswordFullFilled])

    const handleInputsCompletation = (event, id) => {
        if (id === 'outlined-password') {
            setPasswordFullFilled(Boolean(event.target.value.length));
        }
        if (id === 'outlined-confirm-password') {
            setConfirmPasswordFullFilled(Boolean(event.target.value.length));
        }
    };

    const handleSnackbarClose = (setClose, event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setClose(false);
    };

    const handlePasswordChange = () => {
        const userToken = localStorage.getItem("user_token");

        if (!userToken) {
            setOpenTokenSnackbar(true);
            return;
        }

        setBtnDataDisabled(true);
        setBackDropFilter('brightness(0.5)');
        setDisplayDivPassword('flex');
        setCollapsePasswordChecked(true);
        setButtonPasswordDisplay('none');
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setBtnSaveLoading(true);
        setBtnCancelDisabled(true);
        setBtnCancelColor('rgba(0, 0, 0, 0.26)');
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        
        if(password !== confirmPassword){
            setBtnSaveLoading(false);
            setOpenPasswordSnackbar(true);
            setBtnCancelDisabled(false);
            setBtnCancelColor('#fff');
            return;
        } 

        const response = await updatePassword(password);
        if (response){
            setOpenSuccessSnackbar(true);
            setBtnDataDisabled(false);
            setDisplayDivPassword('flex')
            setBackDropFilter('none');
            setCollapsePasswordChecked(false);
            setButtonPasswordDisplay('initial');
            setBtnSaveLoading(false);
            setBtnCancelDisabled(false);
            setBtnCancelColor('#fff');

        } else {
            setBtnSaveLoading(false);
            setOpenFailSnackbar(true);
            setBtnCancelDisabled(false);
            setBtnCancelColor('#fff');
        }
    }

    const handleBtnCancelPassword = (e) => {
        e.preventDefault();
        const form = e.target.closest('form');
        if (form) {
            form.reset();
        }
        setBtnDataDisabled(false);
        setDisplayDivPassword('flex')
        setBackDropFilter('none');
        setCollapsePasswordChecked(false);
        setButtonPasswordDisplay('initial');
    }

    return <ThemeProvider theme={editPasswordTheme}>
                <Container disableGutters={true} className="editPasswordContainer" >
                    <LoadingButton 
                                disabled={btnPasswordDisabled}
                                variant="outlined"
                                onClick={handlePasswordChange} 
                                className="editPasswordButton"
                                sx={{ 
                                    display: buttonPasswordDisplay,
                                    color: editPasswordBtnColor
                                }} >
                        Modificar contraseña
                    </LoadingButton>
                    <Collapse in={collapsePasswordChecked}>
                        <Container 
                                className="secundaryContainer"
                                disableGutters={true}
                                sx={{display: displayDivPassword}} >
                            <Container  className="formContainer"
                                        disableGutters={true} >
                                {<Box   component='form'   
                                        onSubmit={handlePasswordSubmit}
                                        >
                                    <CustomPasswordField
                                        id='outlined-password'
                                        outlinedInputLabel='Contraseña nueva'
                                        label='Contraseña nueva'
                                        name='password'
                                        onChange={(event) => handleInputsCompletation(event, 'outlined-password')} >
                                    </CustomPasswordField>
                                    <CustomPasswordField
                                        id='outlined-confirm-password'
                                        outlinedInputLabel='Confirmar contraseña'
                                        label='Confirmar contraseña'
                                        name='confirmPassword'
                                        onChange={(event) => handleInputsCompletation(event, 'outlined-confirm-password')} >
                                    </CustomPasswordField>
                                    <LoadingButton  
                                                disabled={btnSavePasswordDisabled}
                                                type="submit"
                                                startIcon={<SaveIcon />} 
                                                variant="text"
                                                className="submitButton"
                                                sx={{ color: btnSaveColor }}
                                                loading={btnSaveloading}
                                                loadingPosition='center'
                                                loadingIndicator={<span style={{color: 'white' }}>
                                                                    Espere...
                                                                </span>} >
                                        Guardar
                                    </LoadingButton>
                                    <LoadingButton 
                                                disabled={btnCancelDisabled}
                                                onClick={handleBtnCancelPassword}
                                                variant="text"
                                                className="cancelButton"
                                                type="submit"
                                                sx={{ color: btnCancelColor }} >
                                        Cancelar
                                    </LoadingButton>
                                </Box>}
                            </Container>
                        </Container>
                    </Collapse>
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
                    <Snackbar   open={openPasswordSnackbar} 
                                    autoHideDuration={5000} 
                                    onClose={() => handleSnackbarClose(setOpenPasswordSnackbar)} >
                            <Alert  onClose={() => handleSnackbarClose(setOpenPasswordSnackbar)} 
                                    severity="error" 
                                    sx={{ width: '100%' }} >
                                Las contraseñas no coinciden!
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