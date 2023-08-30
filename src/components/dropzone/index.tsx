import React, {useCallback, useState, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import { Button, Box, Typography, fabClasses } from '@mui/material'


type MyDropzoneProps = {
    onChange?: (any) => any;
}

export function MyDropzone(props){ 
    const {onChange}: MyDropzoneProps = props;
    // const {imagesFromCreateReport} = props;

    const [disabled, setDisabled] = useState(false);

    const [imageUrls, setImageUrls] = useState([]);

    const [open, setOpen] = useState(false);

    // const [disabledBtn, setDisabledBtn] = useState(false);


    const handleSaveBtn = () => {
        // setOpen(true);
        // setDisabledBtn(false);
    }

    const onDrop = useCallback(acceptedFiles => {
        // console.log({acceptedFiles});
        const newUrls = acceptedFiles.map(file => URL.createObjectURL(file));
        setImageUrls(prevUrls => [...prevUrls, ...newUrls])
    }, [])

    useEffect(()=>{
        if (onChange) {
            onChange(imageUrls);
        }
    }, [imageUrls])

    // useEffect(()=>{
        
    // }, [imagesFromCreateReport])

    useEffect(()=>{
        setDisabled(props.disabled);
    }, [props.disabled])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop, noClick: disabled })

    return (<Box    sx={{
                        width: { xs: '95%', sm: '75%', lg: '50%' },
                        marginBottom: {xs: '32px', sm: '15px'},
                        textAlign: 'center',
                    }} 
                    {...getRootProps()} >
                <input  {...getInputProps()} />
                <Button variant="contained"
                        disabled={disabled}
                        onClick={handleSaveBtn}
                        sx={{ width: '100%',
                            fontSize: { md: '1rem', lg: '1.1rem'},
                        }} >
                    Agregar fotos
                </Button>
            </Box>)
}