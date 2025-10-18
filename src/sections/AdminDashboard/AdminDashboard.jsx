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

    useEffect(() => {
        const user = sessionStorage.getItem('username');
        if (!user) {
            navigate('/login'); // Kick them out if not logged in
        }
    }, [navigate]);

    return (

        <GlobalStateContext.Provider value={{ collapsed, setCollapsed }}>
            <div className="dashboard-container">
                <Sidebar />
                <div className={`main-area ${collapsed ? 'collapsed' : ''}`}>
                    <Nav />
                    <div className="outlet-container">
                        <Outlet />
                    </div>
                </div>
            </div>
        </GlobalStateContext.Provider>

    );
};
export default AdminDashboard

