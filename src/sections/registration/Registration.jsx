import React, { useState, useRef } from 'react'
import Background from '../../components/background2.jsx';
import './Registration.css';
import { TextField } from '@mui/material';
import { AppRegistrationRounded } from '@mui/icons-material';
import DOBPicker from '../../components/mui/DOBPicker.jsx'
import CustomInput from '../../components/mui/CustomInput.jsx';
// import EnhancedTable from '../../components/mui/EnhancedTable.jsx';

const Registration = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [toggle, setToggle] = useState(false);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', class: '', email: '', address: '', dob: '' });
    const ref_focus = useRef();
    const [message, setMessage] = useState('');

    // const [name, setName] = useState("");


    const onclick = () => {
        setName(ref_focus.current.focus())
    }
    const toggle_visibility = () => {
        setToggle(() => !toggle);
    }

    const handelChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // alert("this is working");

        const res = await fetch('http://localhost/CBT-MATH-PROJECT/backend/registration.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await res.json();
        setMessage(data.message);

        // console.log(data);

        // if (formData.firstName != "" && formData.lastName != "" && formData.email != "" && formData.address != "" && formData.dob != "" && formData.class != "") {
        if (data.status === "success") {
            alert("this is working");
        }
        // }
    }

    // <>
    //     {/* <Background /> */}
    //     {/* <div className='login_container'>
    //         <span className='home_page-logo'><GraduationCap /></span>
    //         <h3>Student/Admin Login</h3>
    //         <p>Please enter your details to access the CBT Math Exam</p>

    //         <div className='infoRow'>
    //             <label htmlFor="name" onClick={onclick} >User Name: <span style={{ color: 'red', fontSize: '1rem' }}>*</span></label>
    //             <div className='input_style'>
    //                 <span><User className='login_icons' /></span>
    //                 <input className='default_input' type="text" name='name' placeholder='Joseph Baiyekusi' ref={ref_focus} onChange={(e) => setName(e.target.value)} value={name} />
    //             </div>
    //         </div>

    //         <div className='infoRow'>
    //             <label htmlFor="password" >Password: <span style={{ color: 'red', fontSize: '1rem' }}>*</span></label>
    //             <div className='input_style'>
    //                 <span><Lock className='login_icons' /></span>
    //                 <input type={toggle ? 'password' : 'text'} className='default_input' placeholder='******************' name='password' onChange={(e) => setPassword(e.target.value)} value={password} />
    //                 <span onClick={() => toggle_visibility()} title={toggle ? 'View' : 'Hide'}> {toggle ? <Eye className='login_icons' /> : <EyeClosed className='login_icons' title='Hide' />}</span>
    //             </div>
    //         </div>
    //         <button className='btn login_btn'><LogIn className='login_icons' /> LogIn</button>

    //         <p style={{ marginTop: '20px', color: 'grey' }}>Need help? Contact your teacher or administrator</p>

    //     </div > */}


    // </>
    return (

        <><Background />
            <div className="padding">
                <div className="contents">

                    <div className="page_Title">
                        <h4>Registration</h4>
                        <div className="page_navigation">
                            <ul>
                                <li>Users</li>
                                <li className='page_navigation-li'> / &nbsp; Add User</li >
                            </ul>
                        </div>
                    </div>

                    <div className='registeration_container'>
                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <div className="row">
                                {/* <TextField className='inpt' size='small' helperText="First Name" label="First Name" value={name} variant="filled" onChange={(e) => setName(e.target.value)} /> */}
                                {/* <TextField className='inpt' size='small' helperText="Last Name" label="Last Name" variant="filled" /> */}
                                <CustomInput className='inpt' name="firstName" size='small' helperText="First Name" label="First Name" value={formData.firstName} variant="filled" onChange={handelChange} />
                                <CustomInput className='inpt' name="lastName" size='small' helperText="Last Name" label="Last Name" value={formData.lastName} variant="filled" onChange={handelChange} />
                            </div>
                            <div className="row">
                                {/* <TextField className='inpt' size='small' label="Class" variant="filled" type="text" /> */}
                                {/* <TextField className='inpt' size='small' label="Email" variant="filled" type="email" /> */}
                                <CustomInput className='inpt' name="class" size='small' helperText="Class" label="Class" value={formData.class} variant="filled" onChange={handelChange} />
                                <CustomInput className='inpt' name="email" size='small' helperText="Email" label="Email" value={formData.email} variant="filled" onChange={handelChange} />

                            </div>
                            <div className="row">
                                {/* <TextField className='inpt' size='small' label="Date Of Birth" variant="filled" type="date" /> */}
                                <CustomInput className='inpt' name="address" size='small' helperText="Address" label="Address" value={formData.address} variant="filled" onChange={handelChange} />

                                <DOBPicker className='inpt' name="dob" value={formData.dob} onChange={handelChange} />
                                {/* <CustomInput className='inpt' size='small' helperText="First Name" label="First Name" value={name} variant="filled" onChange={(e) => setName(e.target.value)} /> */}

                                {/* <TextField className='inpt' size='small' label="Email" variant="filled" type="email" /> */}
                            </div>
                            <div className="action">
                                <button className="btn registration_btn"><AppRegistrationRounded className='login_icons' />Register</button>
                            </div>

                            {message}
                        </form>

                    </div>

                </div>
            </div>


        </>



    )
}

export default Registration
