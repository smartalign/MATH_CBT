import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  Collapse,
  Toolbar,
  useMediaQuery,
  Box,
} from "@mui/material";
import {
  Dashboard,
  ComputerRounded,
  ExpandMore,
  ExpandLess,
  Group,
  Settings,
} from "@mui/icons-material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Brand from "./../../assets/Images/BrandNewTransp.png";
import GlobalStateContext from "../../context/GlobalStateContext";

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { collapsed } = useContext(GlobalStateContext);
  const [openBank, setOpenBank] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const isMobile = useMediaQuery("(max-width: 992px)");

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      <Toolbar className={isMobile ? "logo_container_mobile" : "logo_container"}>
        <img src={Brand} alt="Brand Logo" />
      </Toolbar>
      <Divider sx={{ backgroundColor: "white" }} />



      {/* <ListItem
        button
        component={Link}
        to="/admin"
        onClick={() => { if (isMobile) setMobileOpen(false); }}
      ></ListItem> */}


      <List sx={{ flexGrow: 1 }}>
        {/* Dashboard */}
        <Tooltip title="Dashboard" className="listItem" placement="right" disableHoverListener={!collapsed} onClick={() => { if (isMobile) setMobileOpen(false); }}>
          <ListItem button component={Link} to="/admin" className="list">
            <ListItemIcon>
              <Dashboard sx={{ color: "white" }} />
            </ListItemIcon>
            {!collapsed && <ListItemText primary="Dashboard" />}
          </ListItem>
        </Tooltip>

        {/* Users */}
        <Tooltip title="Users" className="listItem" placement="right" disableHoverListener={!collapsed}>
          <ListItem button className="list" onClick={() => setOpenUser(!openUser)}>
            <ListItemIcon>
              <Group sx={{ color: "white" }} />
            </ListItemIcon>
            {!collapsed && <ListItemText primary="Users" />}
            {!collapsed &&
              (openUser ? (
                <ExpandLess sx={{ fontSize: "1rem", color: "white", marginRight: "15px" }} />
              ) : (
                <ExpandMore sx={{ fontSize: "1rem", color: "white", marginRight: "15px" }} />
              ))}
          </ListItem>
        </Tooltip>

        {!collapsed && (
          <Collapse in={openUser} timeout="auto" onClick={() => { if (isMobile) setMobileOpen(false); }} unmountOnExit >
            <List component="div">
              <ListItem component={Link} className="list" to="register" button>
                <ListItemIcon>
                  <DoubleArrowIcon sx={{ fontSize: "0.8rem", color: "gray" }} />
                </ListItemIcon>
                <ListItemText primary="Add User" />
              </ListItem>

              <ListItem button component={Link} className="list" to="manageUser">
                <ListItemIcon>
                  <DoubleArrowIcon sx={{ fontSize: "0.8rem", color: "gray" }} />
                </ListItemIcon>
                <ListItemText primary="Manage Users" />
              </ListItem>
            </List>
          </Collapse>
        )}

        {/* Manage Exam */}
        <Tooltip title="Manage Exam" className="listItem" placement="right" disableHoverListener={!collapsed}>
          <ListItem button className="list" onClick={() => setOpenBank(!openBank)}>
            <ListItemIcon>
              <ComputerRounded sx={{ color: "white" }} />
            </ListItemIcon>
            {!collapsed && <ListItemText primary="Manage Exam" />}
            {!collapsed &&
              (openBank ? (
                <ExpandLess sx={{ fontSize: "1rem", color: "white", marginRight: "15px" }} />
              ) : (
                <ExpandMore sx={{ fontSize: "1rem", color: "white", marginRight: "15px" }} />
              ))}
          </ListItem>
        </Tooltip>

        {!collapsed && (
          <Collapse in={openBank} timeout="auto" onClick={() => { if (isMobile) setMobileOpen(false); }} unmountOnExit>
            <List component="div">
              <ListItem button className="list">
                <ListItemIcon>
                  <DoubleArrowIcon sx={{ fontSize: "0.8rem", color: "gray" }} />
                </ListItemIcon>
                <ListItemText primary="Question Bank" />
              </ListItem>

              <ListItem component={Link} className="list" to="add_question" button>
                <ListItemIcon>
                  <DoubleArrowIcon sx={{ fontSize: "0.8rem", color: "gray" }} />
                </ListItemIcon>
                <ListItemText primary="Add Question" />
              </ListItem>

              <ListItem button className="list">
                <ListItemIcon>
                  <DoubleArrowIcon sx={{ fontSize: "0.8rem", color: "gray" }} />
                </ListItemIcon>
                <ListItemText primary="Take a Test" />
              </ListItem>
            </List>
          </Collapse>
        )}

        {/* Settings */}
        <Tooltip title="Settings" className="listItem" placement="right" onClick={() => { if (isMobile) setMobileOpen(false); }} disableHoverListener={!collapsed}>
          <ListItem button component={Link} to="/admin/settings" className="list">
            <ListItemIcon>
              <Settings sx={{ color: "white" }} />
            </ListItemIcon>
            {!collapsed && <ListItemText primary="Settings" />}
          </ListItem>
        </Tooltip>
      </List>
    </Box>
  );

  return (
    <>
      {/* 🖥️ Desktop Sidebar */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: collapsed ? 64 : drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: collapsed ? 64 : drawerWidth,
              transition: "width 0.3s ease-in-out",
              background: "#2f4255ff",
              overflowX: "hidden",
              color: "white",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* 📱 Mobile Sidebar (fullscreen overlay) */}
      {isMobile && (
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              // width: "100%",              // Fullscreen width
              // height: "100%",             // Full height
              background: "#2f4255ff",
              color: "white",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
