import React, { useState, useRef } from 'react'
import Background from '../../components/background2.jsx';
import './Registration.css';
import { TextField } from '@mui/material';
import { AppRegistrationRounded, Dashboard } from '@mui/icons-material';
// import DOBPicker from '../../components/mui/DOBPicker.jsx'
import CustomInput from '../../components/mui/CustomInput.jsx';

// this are import for my dob
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// select import here
import Select from 'react-select';

const Registration = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [toggle, setToggle] = useState(false);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', class: '', email: '', address: '', dob: '', role: '' });
    const ref_focus = useRef();
    const [message, setMessage] = useState('');
    const [error, setErrors] = useState({});

    // react-select needs options as objects: { value, label }
    const classOptions = [
        { value: "Primary 5", label: "Primary 5" },
        { value: "JSS 3", label: "JSS 3" },
        { value: "SSS 3", label: "SSS 3" }
    ];

    // react-select needs options as objects: { value, label }
    const roleOptions = [
        { value: "admin", label: "admin" },
        { value: "student", label: "student" },
        { value: "parent", label: "parent" }
    ];

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

        let newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                newErrors[key] = "This field is required";
            }
        });

        // If we have errors, stop and show them
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({}); // clear errors if all fields valid


        const res = await fetch('http://localhost/CBT-MATH-PROJECT/backend/registration.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        setMessage(data.message);

        // console.log(data);



        if (data.status === "success") {
            alert("Registration Successful!!");
            // Reset formData
            setFormData({
                firstName: "",
                lastName: "",
                class: "",
                email: "",
                address: "",
                dob: ""
            });

            setMessage("");
        }

    }


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
                                <CustomInput className='inpt' name="firstName" size='small' helperText={error.firstName} label="First Name" value={formData.firstName} variant="filled" onChange={handelChange} />
                                <CustomInput className='inpt' name="lastName" size='small' helperText={error.lastName} label="Last Name" value={formData.lastName} variant="filled" onChange={handelChange} />
                            </div>


                            <div className="row">
                                <CustomInput className='inpt' name="address" size='small' helperText={error.address} label="Address" value={formData.address} variant="filled" onChange={handelChange} />
                                <CustomInput className='inpt' name="email" size='small' helperText={error.email} label="Email" value={formData.email} variant="filled" onChange={handelChange} />
                            </div>


                            <div className="row">
                                <div className='inpt'>
                                    <Select
                                        options={classOptions}
                                        name="class"
                                        className='selectInput'
                                        placeholder="-- Select Class --"
                                        menuPlacement="bottom"
                                        value={classOptions.find(option => option.value === formData.class) || null}
                                        onChange={selected => setFormData({ ...formData, class: selected.value })}
                                        styles={{
                                            control: (base, state) => ({
                                                ...base,
                                                height: '3.5rem',
                                                backgroundColor: 'white',
                                                borderColor: state.isFocused ? '#1976d2' : '#bebebeff',
                                                boxShadow: state.isFocused ? '0 0 0 .5px blue' : 'none',
                                                '&:hover': { borderColor: state.isFocused ? '#1976d2' : '#bebebeff' },
                                                // '&:hover': { borderWidth: state.isFocused ? '2px' : '1px' },
                                                borderRadius: '4px',

                                            }),
                                            placeholder: (base) => ({
                                                ...base,
                                                color: '#646464ff',
                                                fontStyle: 'italic',
                                            })
                                        }}
                                    />

                                    {/* ✅ Display error helper text if there's a validation error */}
                                    {error.class && (
                                        <p style={{ color: 'red', fontSize: '0.75rem', marginTop: '4px', marginLeft: '15px' }}>
                                            {error.class}
                                        </p>
                                    )}
                                </div>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Date of Birth"
                                        value={formData.dob ? dayjs(formData.dob) : null}
                                        className="inpt"
                                        name='dob'
                                        maxDate={dayjs()} // No future dates
                                        onChange={(newValue) =>
                                            setFormData({
                                                ...formData,
                                                dob: newValue ? dayjs(newValue).format("YYYY-MM-DD") : ""
                                            })
                                        }
                                        slotProps={{
                                            textField: {
                                                // fullWidth: true,
                                                helperText: error.dob,
                                                className: "dob-input", // ✅ applies external CSS
                                            }
                                        }}
                                    />
                                </LocalizationProvider>
                            </div>


                            <div className="row ">
                                <div className="inpt row_action">
                                    <div className='select_order'>
                                        <Select
                                            options={roleOptions}
                                            name="class"
                                            className='selectInput'
                                            placeholder="-- Select Role --"
                                            menuPlacement="bottom"
                                            value={roleOptions.find(option => option.value === formData.role) || null}
                                            onChange={selected => setFormData({ ...formData, role: selected.value })}
                                            styles={{
                                                control: (base, state) => ({
                                                    ...base,
                                                    height: '3.5rem',
                                                    backgroundColor: 'white',
                                                    borderColor: state.isFocused ? '#1976d2' : '#bebebeff',
                                                    boxShadow: state.isFocused ? '0 0 0 .5px blue' : 'none',
                                                    '&:hover': { borderColor: state.isFocused ? '#1976d2' : '#bebebeff' },
                                                    // '&:hover': { borderWidth: state.isFocused ? '2px' : '1px' },
                                                    borderRadius: '4px',

                                                }),
                                                placeholder: (base) => ({
                                                    ...base,
                                                    color: '#646464ff',
                                                    fontStyle: 'italic',
                                                }),
                                                singleValue: (base) => ({
                                                    ...base,
                                                    color: '#212529',
                                                }),
                                            }}
                                        />

                                        {/* ✅ Display error helper text if there's a validation error */}
                                        {error.class && (
                                            <p style={{ color: 'red', fontSize: '0.75rem', marginTop: '4px', marginLeft: '15px' }}>
                                                {error.class}
                                            </p>
                                        )}
                                    </div>

                                    <button className="btn registration_btn"><AppRegistrationRounded className='login_icons' />Register</button>

                                    {message}
                                </div>

                                <div className="inpt reg_notice">
                                    <h4>Notice:</h4><br />

                                    <li>To login, the default username is the combination of the first and last names while the password is the first name attached with the first four digits Eg: Joseph1234 </li>
                                    <li>You are advised to change your password imediately after loging into your Dashboard</li>

                                </div>


                            </div>



                        </form>

                    </div>

                </div>
            </div>


        </>



    )
}

export default Registration
