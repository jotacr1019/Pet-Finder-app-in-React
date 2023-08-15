import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { List, ListItem, ListItemIcon, ListItemButton, ListItemText, Divider } from "@mui/material";
// import InboxIcon from "@mui/icons-material/Inbox";

export function NavListDrawer({navLinks}){
    return  (<Box>
                <nav>
                    <List>
                        {navLinks.map((item) => {
                            return <div key={item.name}>
                                        <ListItem>
                                            <ListItemIcon>
                                                {item.icon}
                                            </ListItemIcon>
                                            <Link style={{ textDecoration: 'none', color: 'black' }} to={item.path}>
                                                <ListItemButton>
                                                    <ListItemText primary={item.name} />
                                                </ListItemButton>
                                            </Link>
                                        </ListItem>
                                        <Divider />
                                    </div>
                        })}
                    </List>
                </nav>
            </Box>)
}