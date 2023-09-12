import React, { useEffect, useState } from "react";
import { Box, Container, Collapse, ThemeProvider } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { CustomPasswordField } from "../../ui/passwordField";
import { CustomSnackbar } from '../../ui/snackbar';
import { usePasswordUserInDB } from "../../hooks/updatePassword";
import { useBtnPasswordDisabledState, 
    useBtnDataDisabledState,
    useBackdropFilterState } from "../../atoms";
import { editPasswordTheme } from "./themes";


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

    return (
        <ThemeProvider theme={editPasswordTheme}>
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
                                    onSubmit={handlePasswordSubmit} >
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
                                            loadingIndicator={  <span style={{color: 'white' }}>
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
                <CustomSnackbar open={openTokenSnackbar} severity="error" onClose={setOpenTokenSnackbar}>
                    No tienes los permisos para esta acción!
                </CustomSnackbar>
                <CustomSnackbar open={openSuccessSnackbar} severity="success" onClose={setOpenSuccessSnackbar}>
                    Los datos han sido actualizados!
                </CustomSnackbar>
                <CustomSnackbar open={openPasswordSnackbar} severity="error" onClose={setOpenPasswordSnackbar}>
                    Las contraseñas no coinciden!
                </CustomSnackbar>
                <CustomSnackbar open={openFailSnackbar} severity="error" onClose={setOpenFailSnackbar}>
                    Ha ocurrido un error, datos no actualizados!
                </CustomSnackbar>
            </Container>
        </ThemeProvider> )
}