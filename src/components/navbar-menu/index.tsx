import React from "react";
import { Link } from "react-router-dom";
import { ListItemIcon, ListItemButton, ListItemText, Menu, MenuItem } from "@mui/material";
import css from "./index.module.css";


export function CustomMenu({navLinks, anchorEl, open, onClose}){
    const handlePaths = async(name) => {
        if(name === 'Cerrar sesión'){
            localStorage.removeItem('user_token');
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
                </Menu>
            </>)
}