import React from 'react'
import { FaComputer } from "react-icons/fa6";
import { Calculator, Clock, BookOpen, Target, Play, Settings, LogIn } from 'lucide-react';
import './HomePage.css'
import Card from './../../components/card';
import Background from '../../components/background';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// import Login from '../login/Login.jsx';

const HomePage = () => {
    return (
        <><Background />
            <div className='container home_page-container'>
                <span className='home_page-logo'>
                    <FaComputer />
                </span>
                <h1>CBT Maths Exam</h1>
                <p>Master mathematics with our comprehensive
                    computer-based testing platform. Practice,
                    learn, and excel with instant feedback and
                    detailed analytics.</p>

                <Link to='/Login'>
                    <button className='btn home_page-btn'><LogIn className='login_icons' />LogIn</button>
                </Link>

                <div className='infoWrap'>
                    <Card className="infoDiv">
                        <span><BookOpen className='home_page-icons' /></span>
                        <h5>Multiple Topics</h5>
                        <p>Algebra, Geometry, Arithmetic, and More</p>
                    </Card>
                    <Card className="infoDiv">
                        <span><Target className='home_page-icons' /></span>
                        <h5>Multiple Topics</h5>
                        <p>Get immediate results and detailed explanations</p>
                    </Card>
                    <Card className="infoDiv">
                        <span><Clock className='home_page-icons' /></span>
                        <h5>Timed Practice</h5>
                        <p>Improve speed and accuracy under pressure</p>
                    </Card>
                </div>

                {/* <RiSettings4Line /> */}
            </div></>

    )
}

export default HomePage
