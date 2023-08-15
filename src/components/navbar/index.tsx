import React, { useState } from "react";
import { NavListDrawer } from "../navlist";
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
import InboxIcon from "@mui/icons-material/Inbox";
import { lime } from '@mui/material/colors';
import { Link } from "react-router-dom";

const color = lime['A200'];

export function Navbar() {
    const [openNavbar, setOpenNavbar] = useState(false);

    const navLinks = [
        {
            name: 'Reportar mascota',
            path: '/auth',
            icon: <InboxIcon />
        },
        {
            name: 'Mascotas reportadas',
            path: '/auth',
            icon: <InboxIcon />
        },
        {
            name: 'Mis datos',
            path: '/auth', 
            icon: <InboxIcon />
        }
    ]

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        {/* <Tooltip title="Open settings"> */}
                            <IconButton sx={{ p: 0 }}>
                                <Avatar sx={{ mr: "5px"}} src="../../src/assets/dog2.png" />
                                <Typography variant="h6" component="div" color={color}>
                                    Pet finder
                                </Typography>
                            </IconButton>
                        {/* </Tooltip> */}
                    </Box>
                    {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Pet finder
                    </Typography> */}
                    <IconButton onClick={() => setOpenNavbar(true)}
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        sx={{ display: {xs: 'flex', "md": 'none'} }}
                        >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{display: {xs: 'none', "md": 'flex'}}}>
                        {
                            navLinks.map((item, index) => {
                                return (<div key={item.name}>
                                    <Link style={{ textDecoration: 'none', color: 'white' }} to={item.path}>
                                        <Button color={'inherit'}>{item.name}</Button>
                                    </Link>
                                    {index === navLinks.length - 1 ? null : <span>|</span>}
                                </div>)
                            })
                        }
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="right"
                sx={{ display: {xs: 'flex', "md": 'none'} }}
                open={openNavbar}
                onClose={() => setOpenNavbar(false)}>
                <NavListDrawer navLinks={navLinks}/>
            </Drawer>
        </Box>
    );
}