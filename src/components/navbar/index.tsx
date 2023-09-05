import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { AppBar, 
    Box,
    Container,
    ThemeProvider,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PetsIcon from '@mui/icons-material/Pets';
import ReportIcon from '@mui/icons-material/Report';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { grey } from '@mui/material/colors';
import { Link } from "react-router-dom";
import { CustomMenu } from "../navbar-menu";
import { navbarTheme } from "./themes";


const greyColor = grey[900];

export function Navbar() {
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navLinks = [
        {
            name: 'Reportar mascota',
            path: '/create-report',
            icon: <ReportIcon />,
            pathSources: ['/edit-data', '/edit-report', '/edit-password', '/menu', '/user-reports']
        },
        {
            name: 'Mascotas reportadas',
            path: '/user-reports',
            icon: <PetsIcon />,
            pathSources: ['/edit-data', '/edit-report', '/edit-password', '/menu', '/create-report']
        },
        {
            name: 'Mis datos',
            path: '/menu', 
            icon: <FolderSharedIcon />,
            pathSources: ['/edit-data', '/edit-report', '/edit-password', '/user-reports', '/create-report']
        },
        {
            name: 'Cerrar sesión',
            path: '/', 
            icon: <LogoutIcon />,
            pathSources: ['/edit-data', '/edit-report', '/edit-password', '/menu', '/user-reports', '/create-report']
        },
        {
            name: 'Inicio',
            path: '/', 
            icon: <HomeIcon />,
            pathSources: ['/auth', '/sign-up', '/home']
        },
        {
            name: 'Iniciar sesión',
            path: '/auth', 
            icon: <LoginIcon />,
            pathSources: ['/welcome', '/']
        }
    ]

    return (
        <ThemeProvider theme={navbarTheme}>
            <Container disableGutters={true} className="principalContainer" >
                <AppBar position="static" className="appbar" >
                    <Toolbar>
                        <Box    sx={{ flexGrow: 1,
                                    display: 'flex',
                                    alignItems: 'center' 
                                }} >
                            <Avatar className="avatar"
                                    src="../../src/assets/dog2.png" 
                            />
                            <Typography variant="h6" 
                                        component="div" 
                                        className="navbarTitle" >
                                Pet finder
                            </Typography>
                        </Box>
                        <IconButton onClick={handleClick}
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            className="iconButton" >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                            {navLinks.map((item, index) => {
                                if (item.pathSources.includes(location.pathname)) {
                                    let buttonVariant: any = 'text';
                                    let buttonColor: any = '#20b2aa';

                                    if (item.name === 'Iniciar sesión'|| item.name === 'Cerrar sesión') {
                                        buttonVariant = 'outlined';
                                    }

                                    if (item.name === 'Cerrar sesión') {
                                        buttonColor = '#f08080'; 
                                    }

                                    return (<div key={item.name}>
                                                <Link style={{ textDecoration: 'none', color: '#fff' }} to={item.path}>
                                                    <Button variant={buttonVariant} 
                                                            color={'inherit'} 
                                                            sx={{ '&:hover': { color: buttonColor }}}>
                                                        {item.name}
                                                    </Button>
                                                </Link>
                                            </div>)
                                }
                            })}
                        </Box>
                    </Toolbar>
                </AppBar>
                <CustomMenu navLinks={navLinks} 
                            anchorEl={anchorEl} 
                            open={open} 
                            onClose={handleClose} 
                />
            </Container>
        </ThemeProvider>
    );
}