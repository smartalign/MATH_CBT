import React, { useState, useRef, useEffect } from 'react'
import Background from '../../components/background2.jsx';
import './Registration.css';
import { TextField } from '@mui/material';
import { AppRegistrationRounded, Dashboard } from '@mui/icons-material';
import CustomInput from '../../components/mui/CustomInput.jsx';
import { API_URL } from "../../api.js"; // adjust path if needed


// this are import for my dob
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// select import here
import Select from 'react-select';


import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";


const Registration = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [toggle, setToggle] = useState(false);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', class: '', gender: '', email: '', address: '', dob: '', role: '', status: 'ACTIVE' });
    const ref_focus = useRef();
    const [message, setMessage] = useState('');
    const [error, setErrors] = useState({});

    const { role, id } = useParams(); // grabs the id if we are editing
    // const location = useLocation();


    const navigate = useNavigate(); // so we can optionally redirect back after update

    // Get ?role=student from query
    // const queryParams = new URLSearchParams(location.search);
    // const role = queryParams.get("role");

    useEffect(() => {
        console.log("Fetched ID:", id);
        console.log("Role from query:", role);
    }, [id, role]);


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

    const genderOptions = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" }
    ]

    const onclick = () => {
        setName(ref_focus.current.focus())
    }
    const toggle_visibility = () => {
        setToggle(() => !toggle);
    }

    const handelChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }


    useEffect(() => {
        if (!id) {
            setFormData({ firstName: "", lastName: "", class: "", gender: "", email: "", address: "", dob: "", role: "", status: "ACTIVE" });
            return;
        }
        const controller = new AbortController();



        fetch(`${API_URL}/api/get_user_by_id/${role}/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
        })
            .then(res => res.json())
            .then(data => {
                console.log('Fetched user data:', data);
                if (data.status === "success" && data.user) {
                    setFormData(prev => ({
                        ...prev,
                        ...data.user,
                        role: role || data.user.role || ''
                    }));
                } else {
                    console.warn("No user data found:", data);
                }
            })
            .catch(err => console.error("Fetch error:", err));

        return () => controller.abort();
    }, [id, role]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        // ...validation

        let newErrors = {};
        Object.keys(formData).forEach((key) => {
            // 🧠 Skip validation for "class" if role is NOT student
            if (key === "class" && formData.role !== "student") return;

            // Otherwise, check if the field is empty
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


        const endpoint = id
            ? `${API_URL}/api/update_user/${role}/${id}`
            : `${API_URL}/api/register`;
        let payload = id ? { id, ...formData } : formData;

        // ✅ When updating, if user changed the role, include newRole in body
        if (id && formData.role !== role) {
            payload = { ...payload, newRole: formData.role };
        }

        const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const data = await res.json();

        if (data.status === 'success') {
            alert(id ? "User updated successfully!" : "Registration successful!");
            if (!id) {
                setFormData({ firstName: "", lastName: "", class: "", gender: "", email: "", address: "", dob: "", role: "" });
            } else {
                // go back to ManageUsers after update
                navigate('/admin/manageUser');
            }
        } else {
            alert("Something went wrong: " + data.message);
        }
    };




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
                                        options={roleOptions}
                                        name="role"
                                        className='selectInput'
                                        placeholder="-- Select Role --"
                                        menuPlacement="bottom"
                                        value={roleOptions.find(option => option.value === formData.role) || null}
                                        onChange={selected => setFormData({ ...formData, role: selected.value })}
                                        styles={{
                                            control: (base, state) => ({
                                                ...base,
                                                height: '3.6rem',
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
                                    {error.role && (
                                        <p style={{ color: 'red', fontSize: '0.75rem', marginTop: '4px', marginLeft: '15px', fontWeight: '500' }}>
                                            {error.role}
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
                                        {
                                            <>
                                                <Select
                                                    options={genderOptions}
                                                    name="gender"
                                                    className='selectInput'
                                                    placeholder="-- Select Gender--"
                                                    menuPlacement="bottom"
                                                    value={genderOptions.find(option => option.value === formData.gender) || null}
                                                    onChange={selected => setFormData({ ...formData, gender: selected.value })}
                                                    styles={{
                                                        control: (base, state) => ({
                                                            ...base,
                                                            height: '3.5rem',
                                                            backgroundColor: 'white',
                                                            borderColor: state.isFocused ? '#1976d2' : '#bebebeff',
                                                            boxShadow: state.isFocused ? '0 0 0 .5px blue' : 'none',
                                                            '&:hover': { borderColor: state.isFocused ? '#1976d2' : '#bebebeff' },
                                                            borderRadius: '4px',
                                                        }),
                                                        placeholder: (base) => ({
                                                            ...base,
                                                            color: '#646464ff',
                                                            fontStyle: 'italic',
                                                        })
                                                    }}
                                                />

                                                {/* ✅ Now error message is part of the same block */}
                                                {error.gender && (
                                                    <p
                                                        style={{
                                                            color: 'red',
                                                            fontSize: '0.75rem',
                                                            marginTop: '4px',
                                                            marginLeft: '15px',
                                                            fontWeight: '500'
                                                        }}
                                                    >
                                                        {error.gender}
                                                    </p>
                                                )}
                                            </>
                                        }
                                    </div>


                                    <button className="btn registration_btn">
                                        <AppRegistrationRounded className='login_icons' />
                                        {id ? 'Update' : 'Register'}
                                    </button>

                                    {/* <button className="btn registration_btn"><AppRegistrationRounded className='login_icons' />Register</button> */}

                                    {message}
                                </div>


                                <div className="inpt rightRow ">
                                    <div className="row_action">
                                        <div className='select_order'>
                                            {formData.role === "student" && (
                                                <>
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
                                                                borderRadius: '4px',
                                                            }),
                                                            placeholder: (base) => ({
                                                                ...base,
                                                                color: '#646464ff',
                                                                fontStyle: 'italic',
                                                            })
                                                        }}
                                                    />

                                                    {/* ✅ Now error message is part of the same block */}
                                                    {error.class && (
                                                        <p
                                                            style={{
                                                                color: 'red',
                                                                fontSize: '0.75rem',
                                                                marginTop: '4px',
                                                                marginLeft: '15px',
                                                                fontWeight: '500'
                                                            }}
                                                        >
                                                            {error.class}
                                                        </p>
                                                    )}
                                                </>
                                            )}


                                        </div>

                                    </div>

                                    <select
                                        name="status"
                                        className="status"
                                        value={formData.status}
                                        onChange={handelChange}
                                    >
                                        <option value="active">ACTIVE</option>
                                        <option value="inactive">INACTIVE</option>
                                    </select>
                                    <br />
                                    <br />
                                    <br />
                                    <div className="reg_notice">
                                        <h4>Notice:</h4><br />
                                        <li>To login, the default username is the combination of the first and last names while the password is the first name attached with the first four digits Eg: Joseph1234 </li>
                                        <li>You are advised to change your password imediately after loging into your Dashboard</li>
                                    </div>

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
