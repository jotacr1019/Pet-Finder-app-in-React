import React, {useCallback, useState, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import { Button, Box } from '@mui/material'


type MyDropzoneProps = {
    onChange?: (any) => any;
}

export function MyDropzone(props){ 
    const {onChange}: MyDropzoneProps = props;

    const [disabled, setDisabled] = useState(false);

    const [imageUrls, setImageUrls] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const i = new Image();

        const reader = new FileReader();
        reader.onload = function (event) {
            const imgDataURL = event.target.result;
            setImageUrls(prevUrls => [...prevUrls, ...[imgDataURL]]);
        };
        reader.readAsDataURL(file);
        i.onload = () => {
            i.src = file.preview;
        }

        i.src = file.preview;
    }, [])

    useEffect(()=>{
        if (onChange) {
            onChange(imageUrls);
        }
    }, [imageUrls])

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
                        sx={{ width: '100%',
                            fontSize: { md: '1rem', lg: '1.1rem'},
                        }} >
                    Agregar fotos
                </Button>
            </Box>)
}