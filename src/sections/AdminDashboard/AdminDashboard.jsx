import Nav from '../nav/nav';
import Sidebar from '../Sidebar/sidebar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { Outlet } from 'react-router-dom';
import GlobalStateContext from '../../context/GlobalStateContext';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false); // mobile drawer state

    useEffect(() => {
        const user = sessionStorage.getItem('username');
        if (!user) {
            navigate('/login'); // Kick them out if not logged in
        }
    }, [navigate]);

    return (
        <GlobalStateContext.Provider value={{ collapsed, setCollapsed }}>
            <div className="dashboard-container">
                {/* Pass mobileOpen controls to Sidebar */}
                <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

                <div className={`main-area ${collapsed ? 'collapsed' : ''}`}>
                    {/* Pass setMobileOpen to Nav so it can toggle mobile drawer */}
                    <Nav mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

                    <div className="outlet-container">
                        <Outlet />
                    </div>
                </div>
            </div>
        </GlobalStateContext.Provider>
    );
};

export default AdminDashboard;
