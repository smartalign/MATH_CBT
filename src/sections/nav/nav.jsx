import React, { useContext } from 'react';
import './nav.css';
import GlobalStateContext from '../../context/GlobalStateContext';
import { IconButton } from '@mui/material';
import { Menu, Close } from '@mui/icons-material';
import Image from '../../assets/pic/admin.jpg';
import useMediaQuery from '@mui/material/useMediaQuery';
import { motion, AnimatePresence } from "framer-motion";


const Navbar = ({ mobileOpen, setMobileOpen }) => {
  const { collapsed, setCollapsed } = useContext(GlobalStateContext);
  const isMobile = useMediaQuery('(max-width: 992px)');

  const handleToggle = () => {
    if (isMobile) {
      // Toggle mobile sidebar drawer
      setMobileOpen((prev) => !prev);
    } else {
      // Toggle desktop sidebar collapse
      setCollapsed(!collapsed);
    }
  };

  return (
    <header
      className={`navbar ${collapsed ? 'collapsed' : ''}`}
      aria-label="Top navigation"
    >
      <div className="navbar-left">
        <IconButton
          onClick={handleToggle}
          className={isMobile && mobileOpen ? "menu-btn_mobile" : "menu-btn"}

          aria-label={
            isMobile
              ? mobileOpen
                ? 'Close navigation'
                : 'Open navigation'
              : collapsed
                ? 'Expand sidebar'
                : 'Collapse sidebar'
          }

        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mobileOpen ? "close" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {isMobile && mobileOpen ? <Close /> : <Menu />}
            </motion.div>
          </AnimatePresence>
        </IconButton>

        <span className="app-title">CBT Maths</span>
      </div>

      <div className="profile-section">
        <img src={Image} alt="Profile" className="profile-img" />
        <span className="profile-name">Admin</span>
      </div>
    </header>
  );
};

export default Navbar;
