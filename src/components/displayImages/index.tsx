import React, { useState, useEffect } from 'react';
import { Container, Typography, IconButton, ThemeProvider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ImageButton,
    ImageSrc,
    Image,
    ImageBackdrop,
    ImageMarked,
    displayImagesTheme } from './themes';


export function DisplayImages(props) {
    const {imagesReceived} = props
    const {onChange} = props;

    const [imagesUrl, setImagesUrl] = useState([]);

    const [deletedImagesUrl, setDeletedImagesUrl] = useState([]);

    useEffect(() => {
        setImagesUrl(imagesReceived);
    }, [imagesReceived])

    useEffect(() => {
        if (onChange) {
            onChange(deletedImagesUrl);
        }
    }, [deletedImagesUrl])

    const handleDeleteImage = (image: string): void => {
        setDeletedImagesUrl(imagesUrl.filter((item)=> item === image));
        setImagesUrl(imagesUrl.filter((item)=> item !== image));
    }

    return (
        <ThemeProvider theme={displayImagesTheme}>
            <Container  className='imagesContainer' >
                {imagesUrl?.map((image, index) => (
                    <ImageButton key={image} >   
                        <ImageSrc style={{ backgroundImage: `url(${image})` }} />
                        <ImageBackdrop className='MuiImageBackdrop-root' />
                        <Image>
                            {index === 0
                                ? <Typography
                                        component='span'
                                        variant='subtitle1'
                                        color='inherit'
                                        className='typographyText' >
                                    {'Portada'}
                                    <ImageMarked className='MuiImageMarked-root' />
                                </Typography>
                                : null
                            }
                            <IconButton aria-label='delete' 
                                        size='large'
                                        className='iconButton'
                                        onClick={() => handleDeleteImage(image)} >
                                <DeleteIcon className='deleteIcon' />
                            </IconButton>
                        </Image>
                    </ImageButton>
                ))}
            </Container>
        </ThemeProvider>
    );
}