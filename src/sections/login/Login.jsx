import React, { useState, useRef } from 'react'
import Background from './../../components/background';
import { User, GraduationCap, LogIn, Lock, Eye, EyeClosed } from 'lucide-react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../../api.js"; // adjust path if needed


const Login = () => {
    // const [name, setName] = useState('');
    // const [password, setPassword] = useState('');
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [toggle, setToggle] = useState(false);
    const ref_focus = useRef();
    const [error, setError] = useState('');
    const [user_notFound, setUser_notFound] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (formData.username != '' && formData.password != '') {
            if (data.status === "success") {

                // Save to session storage
                sessionStorage.setItem('username', data.username);
                sessionStorage.setItem('role', data.role);

                if (data.role === "admin") navigate("/admin");
                else if (data.role === "student") navigate("/student");
                else if (data.role === "parent") navigate("/parent");
            } else {
                setError(data.message);
                setUser_notFound(data.user_notFound)
            }
        } else {
            setError(data.message = 'Please input both fields');
            // return;
        }
    };


    const onclick = (e) => {
        e.preventDefault(); // optional
        ref_focus.current.focus();
    };

    const toggle_visibility = () => {
        setToggle(() => !toggle);
    }

    return (
        <>
            <Background />
            <div className='login_container'>
                <span className='home_page-logo'><GraduationCap /></span>
                <h3>Student/Admin Login</h3>
                <p>Please enter your details to access the CBT Math Exam</p>

                <form onSubmit={handleSubmit}>
                    <div className='infoRow'>
                        <label htmlFor="name" onClick={onclick} >User Name: <span style={{ color: 'red', fontSize: '1rem' }}>*</span></label>
                        <div className='input_style'>
                            <span><User className='login_icons' /></span>
                            <input className='default_input' type="text" name='username' placeholder='Joseph Baiyekusi' ref={ref_focus} onChange={handleChange} value={formData.username} />
                        </div>
                        <i style={{ color: 'red' }}>{user_notFound}</i>
                    </div>

                    <div className='infoRow'>
                        <label htmlFor="password" >Password: <span style={{ color: 'red', fontSize: '1rem' }}>*</span></label>
                        <div className='input_style'>
                            <span><Lock className='login_icons' /></span>
                            <input type={toggle ? 'password' : 'text'} className='default_input' placeholder='******************' name='password' onChange={handleChange} value={formData.password} />
                            <span onClick={() => toggle_visibility()} title={toggle ? 'View' : 'Hide'}> {toggle ? <Eye className='login_icons' /> : <EyeClosed className='login_icons' title='Hide' />}</span>
                        </div>
                        <i style={{ color: 'red' }}>{error}</i>
                    </div>

                    <center>
                        <button className='btn login_btn'><LogIn className='login_icons' /> LogIn</button>
                    </center>
                </form>


                <p style={{ marginTop: '20px', color: 'grey' }}>Need help? Contact your teacher or administrator</p>

            </div >
        </>


    )
}

export default Login
