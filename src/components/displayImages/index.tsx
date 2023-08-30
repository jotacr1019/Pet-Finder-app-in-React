import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';


const ImageButton = styled('span')(({ theme }) => ({
    position: 'relative',
    cursor: 'auto',
    width: '49.5%',
    height: 330,
    [theme.breakpoints.down('sm')]: {
        width: '100% !important',
        height: 230,
    },
    [theme.breakpoints.down('md')]: {
        width: '100% !important',
        height: 330,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '1px solid currentColor',
            backdropFilter: 'blur(4px)'
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: '6px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center'
});

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: '6px',
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));

export function DisplayImages(props) {
    const {imagesReceived} = props
    const {onChange} = props;
    // console.log({images});
    const [imagesUrl, setImagesUrl] = useState([]);

    const [deletedImagesUrl, setDeletedImagesUrl] = useState([]);

    useEffect(() => {
        // if (onChange) {
        //     onChange(imagesUrl);
        // }
        // console.log('imagesReceived en display: ', imagesReceived);
        // setImagesUrl(imagesReceived.filter((item)=> imagesUrl.includes(item)));
        setImagesUrl(imagesReceived);
    }, [imagesReceived])

    useEffect(() => {
        // console.log('deletedImagesUrl en display: ', deletedImagesUrl);
        if (onChange) {
            onChange(deletedImagesUrl);
        }
    }, [deletedImagesUrl])

    const handleDeleteImage = (image) => {
        setDeletedImagesUrl(imagesUrl.filter((item)=> item === image));
        setImagesUrl(imagesUrl.filter((item)=> item !== image));
    }

    return (
        <Box    sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '5px',
                    width: '95%', 
                    height: {xs: 'fit-content', sm: 'fit-content'},
                    minHeight: {xs: '240px', sm: '280px'},
                    marginTop: {xs: '16px', sm: '16px', md: '40px'},
                    padding: '8px',
                    boxShadow: 'rgb(255 255 255 / 30%) 0px 0px 0px 3px',
                    borderRadius: '8px'
                }}>
            {imagesUrl?.map((image, index) => (
                <ImageButton key={image} >   
                    <ImageSrc style={{ backgroundImage: `url(${image})` }} />
                    <ImageBackdrop className="MuiImageBackdrop-root" />
                    <Image>
                        {index === 0
                            ? <Typography
                                    component="span"
                                    variant="subtitle1"
                                    color="inherit"
                                    sx={{
                                        position: 'relative',
                                        p: 4,
                                        pt: 2,
                                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                    }}
                            >
                                {'Portada'}
                                <ImageMarked className="MuiImageMarked-root" />
                            </Typography>
                            : null
                        }
                        <IconButton aria-label="delete" 
                                    size="large" 
                                    sx={{ color: 'white', 
                                        border: '2px solid #fff',
                                        '&:hover': {
                                            border: '2px solid #91323b',
                                            transform: 'scale(1.1)',
                                            backdropFilter: 'blur(4px)'
                                        }
                                    }}
                                    onClick={() => handleDeleteImage(image)} 
                                    >
                            <DeleteIcon sx={{ 
                                            fontSize: '2rem',
                                            '&:hover': {
                                                backdropFilter: 'blur(4px)'
                                            }
                                        }} 
                            />
                        </IconButton>
                    </Image>
                </ImageButton>
            ))}
        </Box>
    );
}