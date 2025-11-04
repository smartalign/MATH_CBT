import React, { useState, useRef } from 'react'
import Background from './../../components/background'
import { User, GraduationCap, LogIn, Lock, Eye, EyeClosed, Loader2 } from 'lucide-react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { API_URL } from "../../api.js"

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const refFocus = useRef()
    const [error, setError] = useState('')
    const [userNotFound, setUserNotFound] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError('')
        setUserNotFound('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.username || !formData.password) {
            setError('⚠️ Please fill in both fields')
            return
        }

        try {
            setLoading(true) // Start loading

            const res = await fetch(`${API_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (data.status === "success") {
                sessionStorage.setItem('username', data.username)
                sessionStorage.setItem('role', data.role)

                if (data.role === "admin") navigate("/admin")
                else if (data.role === "student") navigate("/student")
                else if (data.role === "parent") navigate("/parent")
                else navigate("/")
            } else {
                setError(data.message || "Invalid credentials")
                setUserNotFound(data.user_notFound || "")
            }
        } catch (err) {
            setError("⚠️ Server connection error. Please try again.")
        } finally {
            setLoading(false) // Stop loading
        }
    }

    const handleLabelClick = (e) => {
        e.preventDefault()
        refFocus.current.focus()
    }

    return (
        <>
            <Background />

            <div className='login_container'>
                <span className='home_page-logo'><GraduationCap /></span>
                <h3>Student/Admin Login</h3>
                <p>Please enter your details to access the CBT Math Exam</p>

                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className='infoRow'>
                        <label htmlFor="username" onClick={handleLabelClick}>
                            Username: <span className='required'>*</span>
                        </label>
                        <div className='input_style'>
                            <span><User className='login_icons' /></span>
                            <input
                                className='default_input'
                                type="text"
                                name='username'
                                id='username'
                                placeholder='Joseph Baiyekusi'
                                ref={refFocus}
                                onChange={handleChange}
                                value={formData.username}
                                disabled={loading}
                            />
                        </div>
                        <small className='error_text'>{userNotFound}</small>
                    </div>

                    {/* Password */}
                    <div className='infoRow'>
                        <label htmlFor="password">
                            Password: <span className='required'>*</span>
                        </label>
                        <div className='input_style'>
                            <span><Lock className='login_icons' /></span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className='default_input'
                                placeholder='******************'
                                name='password'
                                id='password'
                                onChange={handleChange}
                                value={formData.password}
                                disabled={loading}
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                title={showPassword ? 'Hide password' : 'Show password'}
                                style={{ cursor: 'pointer' }}
                            >
                                {showPassword ? <EyeClosed className='login_icons' /> : <Eye className='login_icons' />}
                            </span>
                        </div>
                        <small className='error_text'>{error}</small>
                    </div>

                    <center>
                        <button type="submit" className='btn login_btn' disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className='login_icons spinner' /> Logging in...
                                </>
                            ) : (
                                <>
                                    <LogIn className='login_icons' /> Log In
                                </>
                            )}
                        </button>
                    </center>
                </form>

                <p className='help_text'>Need help? Contact your teacher or administrator</p>
            </div>
        </>
    )
}

export default Login
