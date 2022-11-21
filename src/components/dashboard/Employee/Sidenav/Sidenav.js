import React from 'react';
import { AccountCircleOutlined, LockReset, ListAlt, AddCircleOutline, AccessTime } from '@mui/icons-material';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import './Sidenav.css';

const Sidenav = ({ selectedIndex, setSelectedIndex}) => {
    const menuList = [
        {key: "timeSheet", label: "Time Sheet", icon: <ListAlt />, selected: false},
        {key: "profile", label: "Profile", icon: <AccountCircleOutlined />, selected: false},
        {key: "resetPwd", label: "Reset Password", icon: <LockReset />, selected: false},
    ]
 
    return (
        <div className='side-nav-container'>
            <List component="nav" aria-label="main admin menu" className='menu-list'>
                {menuList.map((menu, ind) => 
                <ListItemButton
                    selected={selectedIndex === ind}
                    onClick={() => setSelectedIndex(ind)}
                    className={`${selectedIndex === ind && 'selected-menu'}`}
                >
                    <ListItemIcon className='list-item-icon'>
                       {menu.icon}
                    </ListItemIcon>
                    <ListItemText className='list-item-title' primary={menu.label} />
                </ListItemButton>
                )}
            </List>
        </div>
    )
}

export default Sidenav