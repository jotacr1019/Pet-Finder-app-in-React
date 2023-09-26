import React, {useCallback, useState, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import { Button, Container, ThemeProvider } from '@mui/material'
import { dropzoneTheme } from './themes'


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

    return (
        <ThemeProvider theme={dropzoneTheme}>
            <Container  {...getRootProps()} 
                        disableGutters={true} 
                        className='dropzoneContainer' >
                <input  {...getInputProps()} />
                <Button variant='contained'
                        disabled={disabled}
                        className='dropzoneButton' >
                    Agregar fotos
                </Button>
            </Container>
        </ThemeProvider>)
}