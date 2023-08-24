import React, { useState } from "react";
import { Box, Button, TextField} from '@mui/material';
import { CustomTextField } from "../../ui/textField";
import { CustomPasswordField } from "../../ui/passwordField";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Collapse from '@mui/material/Collapse';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';


export function MenuDisplay(){
    const [dataChecked, setDataChecked] = useState(false);
    const [passwordChecked, setPasswordChecked] = useState(false);
    const [buttonDataDisplay, setButtonDataDisplay] = useState('initial')
    const [buttonPasswordDisplay, setButtonPasswordDisplay] = useState('initial')
    const [dataAccordionExpanded, setDataAccordionExpanded] = useState(false);
    const [passwordAccordionExpanded, setPasswordAccordionExpanded] = useState(false);

    const [btnDataDisabled, setBtnDataDisabled] = useState(false);
    const [btnPasswordDisabled, setBtnPasswordDisabled] = useState(false);

    const [accordionDataDisplay, setAccordionDataDisplay] = useState('initial');

    const [backDropFilter, setBackDropFilter] = useState('none');

    const [displayCollapse, setDisplayCollapse] = useState('none');

    const [loading, setLoading] = useState(false);

    const [displayDivData, setDisplayDivData] = useState('none');
    const [displayDivPassword, setDisplayDivPassword] = useState('none');


    const handleAccordionData = () => {
        setDataAccordionExpanded(!dataAccordionExpanded);
    };

    const handleAccordionPassword = () => {
        setPasswordAccordionExpanded(!passwordAccordionExpanded);
    };

    // const handleButtonSaveClick = () => {
    //     setAccordionExpanded(false);
    // };

    const handleDataChange = () => {
        // setLoading(true);
        // cuando fetch completed, setLoading(false)
        // setAccordionDataDisplay('none');
        setBtnPasswordDisabled(true);
        setDisplayDivData('flex')
        setBackDropFilter('brightness(0.5)')
        // setTimeout(() => {
            setDataChecked(true);
            // handleAccordionData();
            setButtonDataDisplay(buttonDataDisplay === 'initial' ? 'none' : 'initial');
        // }, 3000)
        // handleAccordionChange('panel1')(null, true);
    };

    const handlePasswordChange = () => {
        // setLoading(true);
        // cuando fetch completed, setLoading(false)
        setBtnDataDisabled(true);
        setBackDropFilter('brightness(0.5)')
        setDisplayDivPassword('flex')
        setPasswordChecked(true);
        // handleAccordionPassword();
        setButtonPasswordDisplay(buttonPasswordDisplay === 'initial' ? 'none' : 'initial');
        // handleClick()
        // handleAccordionChange('panel1')(null, true);
    };

    const handleBtnSaveData = () => {
        // setAccordionDataDisplay('initial');
        setBtnPasswordDisabled(false);
        setBackDropFilter('none');
        setDisplayDivData('flex')
        setDisplayCollapse('none')
        setDataChecked(false);
        // handleAccordionData();
        setButtonDataDisplay(buttonDataDisplay === 'initial' ? 'none' : 'initial');
    }

    const handleBtnSavePassword = () => {
        setBtnDataDisabled(false);
        setDisplayDivPassword('flex')
        setBackDropFilter('none');
        setPasswordChecked(false);
        // handleAccordionPassword();
        setButtonPasswordDisplay(buttonPasswordDisplay === 'initial' ? 'none' : 'initial');
    }

    // const doTi = () => {
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 3000)
    // }

    // function handleClick() {
    //     setLoading(true);
    //     doTi()
    // }

    // const [expanded, setExpanded] = useState<string | false>(false);

    // const handleAccordionChange =
    //     (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    //         setExpanded(isExpanded ? panel : false);
    //     };

    // 

    // <Box sx={{  display: 'grid',
    //         // display: {xs: 'flex', md: 'grid'},
    //         // flexDirection: 'column',
    //         gridTemplateRows: '30% 1fr',
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         width: '100%', 
    //         height: '100%', 
    //         padding: '10px' 
    //     }}>
    {/* <h2 style={{fontSize: '3rem'}}>Datos Personales</h2> */}
    return  <Box sx={{  display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            width: '100%', 
                            height: '70%',
                            padding: '10px', 
                            border: "1px solid",
                            borderRadius: '6px',
                            backdropFilter: backDropFilter,
                            boxShadow: 'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;'
                        }}>
                    {/* <Accordion  expanded={dataAccordionExpanded} 
                                sx={{   boxShadow: 'none',
                                        // display: {accordionDataDisplay},
                                        boder: '1px solid green',
                                        '.css-sh22l5-MuiButtonBase-root-MuiAccordionSummary-root:hover:not(.Mui-disabled)': 
                                            {cursor: 'auto'}
                                    }}> */}
                        {/* <AccordionSummary
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            sx={{ '.MuiAccordionSummary-root .Mui-expanded .MuiAccordionSummary-gutters .MuiAccordionSummary-contentGutters .css-16b5xxh-MuiButtonBase-root-MuiAccordionSummary-root': {
                                display: {accordionDataDisplay},
                            }
                            //      display: {accordionDataDisplay},
                            //     // '.css-14xrid4-MuiButtonBase-root-MuiAccordionSummary-root:hover:not(.Mui-disabled)': 
                            //     //     {cursor: 'auto'}
                                }}
                        > */}
                            <Box sx={{
                                // display: 'flex',
                                // justifyContent: 'center',
                                width: '88%',
                                textAlign: 'center',
                                // width: {xs: '65%'},
                                // minWidth: {xs: '65%'},
                                // margin: '0 auto',
                                }}>
                            <LoadingButton  disabled={btnDataDisabled}
                                            variant="outlined"
                                            // color="error" 
                                            onClick={handleDataChange} 
                                            sx={{display: buttonDataDisplay,
                                                width: {xs: '80%', md: '60%', lg: '55%'},
                                                transition: '0.2s',
                                                '&:hover': {
                                                    transform: 'scale(1.1)',
                                                    // color: 'white',
                                                    backdropFilter: 'blur(4px)',
                                                    opacity: 1
                                                },
                                                backgroundColor: '#191970',
                                                color: 'white',
                                                opacity: 0.8
                                            }}
                                            loading={loading}
                                            loadingIndicator="Espere…" >
                                Modificar datos personales
                            </LoadingButton>
                            {/* </AccordionSummary> */}
                            {/* <AccordionDetails> */}
                            <Collapse in={dataChecked}
                                    sx={{ 
                                        // height: '250px',
                                        width: '100%',
                                        // border: '2px solid white',
                                        // display: displayCollapse
                                    }}>
                                <Box sx={{width: '100%', 
                                        height: '230px', 
                                        // border: '1px solid blue', 
                                        display: displayDivData,
                                        justifyContent: 'center',
                                        alignItems: 'center' }}>
                                    <Box    sx={{
                                                '& > :not(style)': {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    // justifyContent: 'space-around',
                                                    justifyContent: 'center',
                                                    gap: '10px',
                                                    height: 220,
                                                    width: {xs: 250, sm: 335, md: 400, lg: 440},
                                                },
                                                border: '1px solid green',
                                            }} >
                                        {/* <div> */}
                                            {/* <Collapse in={dataChecked}> */}
                                                {<div>
                                                    <CustomTextField
                                                        // required={true}
                                                        id="outlined-name"
                                                        label="Nombre"
                                                        placeholder="Ingresa un nombre"
                                                        name="full_name"
                                                        // onChange={handleEmailandPasswordInputs}
                                                        // error={errorLabel && isValidEmail === false} 
                                                    />
                                                    <CustomTextField
                                                        // required={true}
                                                        id="outlined-email"
                                                        label="Email"
                                                        placeholder="ejemplo@mail.com"
                                                        name="email"
                                                        // onChange={handleEmailandPasswordInputs}
                                                        // error={errorLabel && isValidEmail === false} 
                                                    />
                                                    <LoadingButton  onClick={handleBtnSaveData}
                                                                    // variant="outlined"
                                                                    loading={loading}
                                                                    loadingPosition="start"
                                                                    startIcon={<SaveIcon />} 
                                                                    sx={{width: '100%',
                                                                        color: 'white',
                                                                        backgroundColor: '#191970',
                                                                        '&:hover': {
                                                                            backgroundColor: '#00004e',
                                                                        }
                                                                    }} >
                                                        Guardar
                                                    </LoadingButton>
                                                </div>}
                                            {/* </Collapse> */}
                                        {/* </div> */}
                                    </Box>
                                </Box>
                            </Collapse>
                            </Box>
                        {/* </AccordionDetails>
                    </Accordion> */}
                {/* </Box>
                <Box sx={{ width: '90%', height: '50%', border: 1 }}> */}
                    {/* <Accordion  expanded={passwordAccordionExpanded} 
                                sx={{'.css-sh22l5-MuiButtonBase-root-MuiAccordionSummary-root:hover:not(.Mui-disabled)': 
                                        {cursor: 'auto'},
                                        boxShadow: 'none',
                                        boder: '1px solid green',
                                    }}> */}
                        {/* <AccordionSummary
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        > */}
                            <Box sx={{
                                // display: 'flex',
                                // justifyContent: 'center',
                                width: '88%',
                                textAlign: 'center',
                                // minWidth: {xs: '65%'},
                                // margin: '0 auto',
                                }}>
                            <LoadingButton disabled={btnPasswordDisabled}
                                    variant="outlined"
                                    onClick={handlePasswordChange} 
                                    sx={{   display: buttonPasswordDisplay,
                                            width: {xs: '80%', md: '60%', lg: '55%'},
                                            transition: '0.2s',
                                            '&:hover': {
                                                transform: 'scale(1.1)',
                                                // color: 'white',
                                                backdropFilter: 'blur(4px)',
                                                opacity: 1
                                                // backDropFilter: 'brightness(0.5)',
                                            },
                                            backgroundColor: '#191970',
                                            color: 'white',
                                            opacity: 0.8
                                    }} >
                                Modificar contraseña
                            </LoadingButton>
                            {/* </AccordionSummary>
                            <AccordionDetails> */}
                            <Collapse in={passwordChecked}
                                        // sx={{ border: '2px solid white'}}
                                        >
                            <Box sx={{width: '100%', 
                                    height: '230px', 
                                    // border: '1px solid blue', 
                                    display: displayDivPassword,
                                    justifyContent: 'center',
                                    alignItems: 'center' }}>
                                <Box    sx={{
                                            '& > :not(style)': {
                                                display: 'flex',
                                                flexDirection: 'column',
                                                // justifyContent: 'space-around',
                                                justifyContent: 'center',
                                                gap: '10px',
                                                height: 220,
                                                width: {xs: 250, sm: 335, md: 400, lg: 440},
                                            },
                                            border: '1px solid green',
                                        }} >
                                    {/* <div> */}
                                        {/* <Collapse in={dataChecked}> */}
                                            {<div>
                                                <CustomPasswordField
                                                    required={true} 
                                                    id='outlined-adornment-password'
                                                    outlinedInputLabel='Contraseña nueva'
                                                    label='Contraseña nueva'
                                                    name='password'
                                                    // onChange={handleInputsCompletation}
                                                >
                                                </CustomPasswordField>
                                                <CustomPasswordField 
                                                    required={true}
                                                    id='outlined-adornment-confirm-password'
                                                    outlinedInputLabel='Confirmar contraseña'
                                                    label='Confirmar contraseña'
                                                    name='confirmPassword'
                                                    // onChange={handleInputsCompletation} 
                                                >
                                                </CustomPasswordField>
                                                <LoadingButton  onClick={handleBtnSavePassword}
                                                                // variant="outlined"
                                                                loading={loading}
                                                                loadingPosition="start"
                                                                startIcon={<SaveIcon />} 
                                                                sx={{width: '100%',
                                                                    color: 'white',
                                                                    backgroundColor: '#191970',
                                                                    '&:hover': {
                                                                        backgroundColor: '#00004e',
                                                                    }
                                                                }} >
                                                    Guardar
                                                </LoadingButton>
                                            </div>}
                                        {/* </Collapse> */}
                                    {/* </div> */}
                                </Box>
                            </Box>
                            </Collapse>
                            </Box>
                        {/* </AccordionDetails>
                    </Accordion> */}
                </Box>
            // </Box>
}