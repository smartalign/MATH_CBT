import React, { useContext } from 'react';
import './nav.css';
import GlobalStateContext from '../../context/GlobalStateContext';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Tooltip,
  Box,
  Toolbar
} from '@mui/material';
import { Dashboard, Group, Settings, Menu } from '@mui/icons-material';
import Image from '../../assets/pic/admin.jpg'

const Navbar = () => {
  const { collapsed, setCollapsed } = useContext(GlobalStateContext);

  return (
    <div className={`navbar ${collapsed ? 'collapsed' : ''}`} style={{ width: collapsed ? '96%' : '82.5%' }}>


      <IconButton onClick={() => setCollapsed(!collapsed)}>
        <Menu />
      </IconButton>
      <div className="profile-section">
        <img src={Image} alt="Profile" className="profile-img" />

        {/* <span>Welcome, {username}</span> */}
      </div>
    </div>
  );
};


export default Navbar;
