import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ListItemIcon,
        ListItemButton, 
        ListItemText,
        Backdrop, 
        CircularProgress,
        Menu,
        MenuItem } from "@mui/material";
import { useGetPetsOfUser, usePetsOfUser } from "../../hooks/petsOfUser";
import css from "./index.module.css";


export function CustomMenu({navLinks, anchorEl, open, onClose}){
    const [petsOfUser, setPetsOfUser] = usePetsOfUser();
    const { getPetsOfUser } = useGetPetsOfUser();

    const [openLocationBtnReload, setOpenLocationBtnReload] = useState(false);

    const navigate = useNavigate();

    const handlePaths = async(name) => {
        if(name === 'Cerrar sesión'){
            localStorage.removeItem('user_token');
        }
        if(name === 'Mascotas reportadas'){
            setOpenLocationBtnReload(true);
            const petsFound = await getPetsOfUser();
            setPetsOfUser(petsFound);
            setOpenLocationBtnReload(false);
            navigate("/user-reports");
        }
    }

    return (<>
                <Menu   id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={onClose}
                        sx={{ display: {xs: 'flex', md: 'none'},
                            '.css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper': {
                                backgroundColor: '#aebecf' 
                            }
                        }}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }} >   
                    {navLinks.map((item) => {
                        if (item.pathSources.includes(location.pathname.split('/')[1])) {
                            return (<Link   key={item.name} 
                                            onClick={onClose} 
                                            className={css.link}
                                            to={item.path} >
                                        <MenuItem >
                                        <ListItemIcon sx={{ justifyContent: 'center' }}>
                                            {item.icon}
                                        </ListItemIcon> 
                                            <ListItemButton sx={{ 
                                                                '&:hover': {backgroundColor: 'transparent' }
                                                            }}
                                                            onClick={() => handlePaths(item.name)} 
                                                            disableRipple >
                                                <ListItemText primary={item.name} />
                                            </ListItemButton>
                                        </MenuItem>
                                    </Link> 
                            );
                        }
                    })}
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={openLocationBtnReload} >   
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Menu>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={openLocationBtnReload} >   
                    <CircularProgress color="inherit" />
                </Backdrop>
            </>)
}