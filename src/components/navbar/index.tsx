import React, { useState } from "react";
// import { NavListDrawer } from "../navlist";
import { useLocation } from "react-router-dom";
import { AppBar, 
    Box,
    Toolbar,
    Typography,
    Button,
    Drawer,
    IconButton,
    Divider,
    Avatar,
    Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PetsIcon from '@mui/icons-material/Pets';
import ReportIcon from '@mui/icons-material/Report';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { lime, grey } from '@mui/material/colors';
import { Link } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CustomMenu } from "../navlist"

const limeColor = lime['A200'];
const greyColor = grey[900];

export function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // const [openNavbar, setOpenNavbar] = useState(false);
    // const location = useLocation();

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
            name: 'Logout',
            path: '/welcome', 
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
            name: 'Sign in',
            path: '/auth', 
            icon: <LoginIcon />,
            pathSources: ['/welcome', '/']
        }
    ]

    return (
        <Box sx={{ flexGrow: 1, minWidth: 375 }}>
            <AppBar position="static" sx={{ backgroundColor: greyColor }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        {/* <Tooltip title="Open settings"> */}
                            <IconButton sx={{ p: 0 }}>
                                <Avatar sx={{ mr: "5px"}} src="../../src/assets/dog2.png" />
                                <Typography variant="h6" component="div" sx={{ color: '#bdb76b' }}>
                                    Pet finder
                                </Typography>
                            </IconButton>
                        {/* </Tooltip> */}
                    </Box>
                    {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Pet finder
                    </Typography> */}
                    <IconButton onClick={handleClick}
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        sx={{ display: {xs: 'flex', md: 'none'} }}
                        >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        {
                            // navLinks.map((item, index) => {
                            //     return (<div key={item.name}>
                            //         <Link style={{ textDecoration: 'none', color: 'white' }} to={item.path}>
                            //             <Button color={'inherit'}>{item.name}</Button>
                            //         </Link>
                            //         {index === navLinks.length - 1 ? null : <span>|</span>}
                            //     </div>)
                            // })
                            navLinks.map((item, index) => {
                                if (item.pathSources.includes(location.pathname)) {
                                    return (<div key={item.name}>
                                                <Link style={{ textDecoration: 'none', color: 'white' }} to={item.path}>
                                                    <Button color={'inherit'}>{item.name}</Button>
                                                </Link>
                                                {index >= 3 ? null : <span>|</span>}
                                            </div>)
                                }
                            })
                        }
                    </Box>
                </Toolbar>
            </AppBar>
            <CustomMenu navLinks={navLinks} anchorEl={anchorEl} open={open} onClose={handleClose} />
            {/* </CustomMenu> */}
            {/* <Drawer
                anchor="right"
                sx={{ display: {xs: 'flex', "md": 'none'} }}
                open={openNavbar}
                onClose={() => setOpenNavbar(false)}>
                <NavListDrawer navLinks={navLinks}/>
            </Drawer> */}
        </Box>
    );
}