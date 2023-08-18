import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { List, ListItem, ListItemIcon, ListItemButton, ListItemText, Divider } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import InboxIcon from "@mui/icons-material/Inbox";


export function CustomMenu({navLinks, anchorEl, open, onClose}){
    // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    // const open = Boolean(anchorEl);
    // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // }

    return (<Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={onClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >   
                {navLinks.map((item) => {
                        if (item.pathSources.includes(location.pathname)) {
                            return (
                                <div key={item.name}>
                                    <MenuItem>
                                        <ListItemIcon sx={{ justifyContent: 'center' }}>
                                            {item.icon}
                                        </ListItemIcon> 
                                        <Link style={{ textDecoration: 'none', color: 'black' }} to={item.path}>
                                            <ListItemButton onClick={onClose}>
                                                <ListItemText primary={item.name} />
                                            </ListItemButton>
                                        </Link> 
                                    </MenuItem>
                                    <Divider />
                                </div>
                            );
                        }
                    })}
                {/* <MenuItem onClick={onClose}>Profile</MenuItem> */}
            </Menu>)
    // return  (<Box sx={{ minWidth: 220 }}>
    //             <nav>
    //                 <List>
    //                 {navLinks.map((item) => {
    //                     if (item.pathSources.includes(location.pathname)) {
    //                         return (
    //                             <div key={item.name}>
    //                                 <ListItem>
    //                                     <ListItemIcon sx={{ justifyContent: 'center' }}>
    //                                         {item.icon}
    //                                     </ListItemIcon> 
    //                                     <Link style={{ textDecoration: 'none', color: 'black' }} to={item.path}>
    //                                         <ListItemButton>
    //                                             <ListItemText primary={item.name} />
    //                                         </ListItemButton>
    //                                     </Link> 
    //                                 </ListItem>
    //                                 <Divider />
    //                             </div>
    //                         );
    //                     }
    //                 })}
    //                 </List>
    //             </nav>
    //         </Box>)
}