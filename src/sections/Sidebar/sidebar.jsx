import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css'
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
  Toolbar,
  ListItemButton,
  Collapse
} from '@mui/material';
import { Dashboard, ComputerRounded, ExpandMore, ExpandLess, Group, Settings, Menu } from '@mui/icons-material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Brand from './../../assets/Images/BrandNewTransp.png'

import GlobalStateContext from '../../context/GlobalStateContext';

const drawerWidth = 240;

const Sidebar = () => {
  const { collapsed, setCollapsed } = useContext(GlobalStateContext);

  const [openBank, setOpenBank] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  const handleClickBank = () => {
    setOpenBank(!openBank);
  };

  const handleClickUser = () => {
    setOpenUser(!openUser);
  };

  return (
    <Drawer
      variant="permanent"
      // className='sidebar'
      sx={{
        width: collapsed ? 64 : drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? 64 : drawerWidth,
          overflowX: 'hidden',
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          transition: 'width 0.3s ease-in-out',
          background: '#2f4255ff',
          userSelect: 'none'

        },
      }}
    >
      <Toolbar className='logo_container'>
        {/* <Brand /> */}
        <img src={Brand} alt="Brand Logo" />
      </Toolbar>
      <Divider sx={{ backgroundColor: 'white' }} />
      <List>
        <div className='listItem'>
          <Tooltip title="Dashboard" placement="right" disableHoverListener={!collapsed} >
            <ListItem button className='list' component={Link} to="/admin">
              <ListItemIcon className='listItem'  ><Dashboard /></ListItemIcon>
              {!collapsed && <ListItemText primary="Dashboard" />}
            </ListItem>
          </Tooltip>
        </div>

        <div className='listItem' onClick={handleClickUser}>
          <Tooltip title="Users" placement="right" disableHoverListener={!collapsed}>
            <ListItem button className='list' >
              <ListItemIcon className='listItem'  ><Group /></ListItemIcon>
              {!collapsed && <ListItemText primary="Users"></ListItemText>}
              {openUser ? <ExpandLess sx={{ fontSize: '1rem', color: 'white', marginRight: '15px' }} /> : <ExpandMore sx={{ fontSize: '1rem', color: 'white', marginRight: '15px' }} />}
            </ListItem>

            <Collapse in={openUser} className='listItemMenu' timeout="auto" unmountOnExit>
              <List component="div"  >

                <ListItem component={Link} className='list' to='register' button>
                  <ListItemIcon sx={{ minWidth: '30px' }}>
                    <DoubleArrowIcon sx={{ fontSize: '0.8rem', color: 'gray' }} />
                  </ListItemIcon>
                  <ListItemText className="nested" primary='Add User' />
                </ListItem>


                <ListItem button component={Link} className='list' to='manageUser'>
                  <ListItemIcon sx={{ minWidth: '30px' }}>
                    <DoubleArrowIcon sx={{ fontSize: '0.8rem', color: 'gray' }} />
                  </ListItemIcon>
                  <ListItemText className="nested" primary="Manage Users" />
                </ListItem>

              </List>
            </Collapse>
          </Tooltip>
        </div>



        <div className='listItem' onClick={handleClickBank}>
          <Tooltip title="Test" placement="right" disableHoverListener={!collapsed}>
            <ListItem className='list' button>
              <ListItemIcon className='listItem'  ><ComputerRounded /></ListItemIcon>
              {!collapsed && <ListItemText primary="Manage Exam"></ListItemText>}
              {openBank ? <ExpandLess sx={{ fontSize: '1rem', color: 'white', marginRight: '15px' }} /> : <ExpandMore sx={{ fontSize: '1rem', color: 'white', marginRight: '15px' }} />}
            </ListItem>

            <Collapse in={openBank} className='listItemMenu' timeout="auto" unmountOnExit>
              <List component="div">

                <ListItem button className='list'>
                  <ListItemIcon sx={{ minWidth: '30px' }}>
                    <DoubleArrowIcon sx={{ fontSize: '0.8rem', color: 'gray' }} />
                  </ListItemIcon>
                  <ListItemText className="nested" primary='Question Bank' />
                </ListItem>


                <ListItem component={Link} className='list' to='add_question' button>
                  <ListItemIcon sx={{ minWidth: '30px' }}>
                    <DoubleArrowIcon sx={{ fontSize: '0.8rem', color: 'gray' }} />
                  </ListItemIcon>
                  <ListItemText className="nested" primary="Add Question" />
                </ListItem>
                <ListItem button className='list'>
                  <ListItemIcon sx={{ minWidth: '30px' }}>
                    <DoubleArrowIcon sx={{ fontSize: '0.8rem', color: 'gray' }} />
                  </ListItemIcon>
                  <ListItemText className="nested" primary="Take a Test" />
                </ListItem>
              </List>
            </Collapse>
          </Tooltip>
        </div>



        <div className='listItem'>
          <Tooltip title="Settings" placement="right" disableHoverListener={!collapsed}>
            <ListItem button className='list' component={Link} to="/admin/settings">
              <ListItemIcon className='listItem'><Settings /></ListItemIcon>
              {!collapsed && <ListItemText primary="Settings" />}
            </ListItem>
          </Tooltip>
        </div>



      </List >
    </Drawer >
  );
};

export default Sidebar;
