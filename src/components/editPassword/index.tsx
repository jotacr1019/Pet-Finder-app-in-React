import React, { useEffect, useState } from "react";
import { Box, Snackbar, Collapse} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { CustomPasswordField } from "../../ui/passwordField";
import { usePasswordUserInDB } from "../../hooks/updatePassword";
import { useBtnPasswordDisabledState, 
    useBtnDataDisabledState,
    useBackdropFilterState } from "../../atoms";


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

    const handleInputsCompletation = (event, id) => {
        if (id === 'outlined-password') {
            setPasswordFullFilled(Boolean(event.target.value.length));
        }
        if (id === 'outlined-confirm-password') {
            setConfirmPasswordFullFilled(Boolean(event.target.value.length));
        }
    };

    useEffect(() => {
        setBtnSavePasswordDisabled(eventPasswordFullFilled && eventConfirmPasswordFullFilled ? false : true);
    }, [eventPasswordFullFilled, eventConfirmPasswordFullFilled])

    const handleSnackbarClose = (setClose, event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setClose(false);
    };

    const handlePasswordChange = () => {
        const userToken = localStorage.getItem("user_token");
        if (userToken) {
            setBtnDataDisabled(true);
            setBackDropFilter('brightness(0.5)')
            setDisplayDivPassword('flex')
            setCollapsePasswordChecked(true);
            setButtonPasswordDisplay('none');
        } else {
            setOpenTokenSnackbar(true);
        }
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setBtnSaveLoading(true);
        setBtnCancelDisabled(true);
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        if(password !== confirmPassword){
            setBtnSaveLoading(false);
            setOpenPasswordSnackbar(true);
            setBtnCancelDisabled(false);
        } else {
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
            } else {
                setBtnSaveLoading(false);
                setOpenFailSnackbar(true);
                setBtnCancelDisabled(false);
            }
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
        setButtonPasswordDisplay(buttonPasswordDisplay === 'initial' ? 'none' : 'initial');
    }

    return <Box     sx={{
                        width: '88%',
                        textAlign: 'center'
                    }} >
                <LoadingButton 
                            disabled={btnPasswordDisabled}
                            variant="outlined"
                            onClick={handlePasswordChange} 
                            sx={{  
                                display: buttonPasswordDisplay,
                                width: {xs: '80%', md: '60%', lg: '55%'},
                                transition: '0.2s',
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                    backdropFilter: 'blur(4px)',
                                    opacity: 1
                                },
                                backgroundColor: '#191970',
                                color: 'white',
                                opacity: 0.8
                            }} >
                    Modificar contraseña
                </LoadingButton>
                <Collapse in={collapsePasswordChecked}>
                    <Box    sx={{width: '100%', 
                                height: '230px',
                                display: displayDivPassword,
                                justifyContent: 'center',
                                alignItems: 'center' 
                            }} >
                        <Box    sx={{
                                    '& > :not(style)': {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        height: 220,
                                        width: {xs: 250, sm: 335, md: 400, lg: 440},
                                    }
                                }} >
                            {<Box   component='form'   
                                    onSubmit={handlePasswordSubmit}
                                    >
                                <CustomPasswordField
                                    id='outlined-password'
                                    outlinedInputLabel='Contraseña nueva'
                                    label='Contraseña nueva'
                                    name='password'
                                    onChange={(event) => handleInputsCompletation(event, 'outlined-password')}
                                >
                                </CustomPasswordField>
                                <CustomPasswordField
                                    id='outlined-confirm-password'
                                    outlinedInputLabel='Confirmar contraseña'
                                    label='Confirmar contraseña'
                                    name='confirmPassword'
                                    onChange={(event) => handleInputsCompletation(event, 'outlined-confirm-password')}
                                >
                                </CustomPasswordField>
                                <LoadingButton  
                                            disabled={btnSavePasswordDisabled}
                                            type="submit"
                                            startIcon={<SaveIcon />} 
                                            sx={{width: '100%',
                                                color: 'white',
                                                backgroundColor: '#191970',
                                                '&:hover': {
                                                    backgroundColor: '#00004e',
                                                }
                                            }} 
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
                                            type="submit"
                                            sx={{width: '100%',
                                                color: 'white',
                                                backgroundColor: '#91323b',
                                                '&:hover': {
                                                    backgroundColor: '#891722',
                                                }
                                            }} >
                                    Cancelar
                                </LoadingButton>
                            </Box>}
                        </Box>
                    </Box>
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
            </Box>
}