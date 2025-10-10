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


import { useParams, useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";


const Registration = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [toggle, setToggle] = useState(false);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', class: '', email: '', address: '', dob: '', role: '' });
    const ref_focus = useRef();
    const [message, setMessage] = useState('');
    const [error, setErrors] = useState({});

    const { id } = useParams(); // grabs the id if we are editing
    const location = useLocation();


    const navigate = useNavigate(); // so we can optionally redirect back after update

    // Get ?role=student from query
    const queryParams = new URLSearchParams(location.search);
    const role = queryParams.get("role");

    console.log("Fetched ID:", id);
    console.log("Role from query:", role);



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

    /*  const handleSubmit = async (e) => {
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
 
     } */

    //   useEffect(() => {
    //       if (id) {
    //           // 🧠 We’re editing an existing user
    //           fetch(`http://localhost/CBT-MATH-PROJECT/backend/get_user_by_id.php?id=${id}`)
    //               .then((res) => res.json())
    //               .then((data) => {
    //                   if (data && data.status === "success" && data.user) {
    //                       const user = data.user;

    //                       // 🧩 Fill formData with fetched user info
    //                       setFormData({
    //                           firstName: user.firstName || "",
    //                           lastName: user.lastName || "",
    //                           class: user.class || "",
    //                           email: user.email || "",
    //                           address: user.address || "",
    //                           dob: user.dob || "",
    //                           role: user.role || "",
    //                       });
    //                   }
    //               })
    //               .catch((err) => console.error("Error fetching user:", err));
    //       }
    //   }, [id]);



    // ===============================

    /*     useEffect(() => {
            if (!id) return;
            const controller = new AbortController();
    
            fetch(`http://localhost/cbt-math-project/backend/get_user_by_id.php?id=${id}&role=${role}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                signal: controller.signal,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('Fetched user data:', data); // ✅ Debug log
                    if (data.status === "success" && data.user) {
                        setFormData(
                            // data.user
                            setFormData(prev => ({
                                ...prev,
                                ...data.user
                            }))
                        );
        } else {
            alert(`Something went wrong: ${data.message
        }`);
                    }
                })
                .catch((err) => console.error("Fetch error:", err));
    
            return () => controller.abort();
        }, [id]); */

    useEffect(() => {
        if (!id) {
            setFormData({ firstName: "", lastName: "", class: "", email: "", address: "", dob: "", role: "" });
            return;
        }
        const controller = new AbortController();



        fetch(`${API_URL}/get_user_by_id.php?id=${id}&role=${role}`, {
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




    /*    useEffect(() => {
           // require both id and role
           if (!id) return;
           const queryParams = new URLSearchParams(location.search);
           const roleFromQuery = queryParams.get("role");
           if (!roleFromQuery) {
               console.error('Role missing in URL query string.');
               return;
           }
   
           const controller = new AbortController();
           // const roleEscaped = encodeURIComponent(roleFromQuery);
           const url = `http://localhost/cbt-math-project/backend/get_user_by_id.php?id=${id}&role=${role}`;

        console.log('Fetching user at:', url); // debug

    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
    })
        .then((res) => res.json())
        .then((data) => {
            console.log('get_user_by_id response:', data);
            if (data && data.status === "success" && data.user) {
                // data.user is expected to be an object
                setFormData(prev => ({
                    // copy existing formData keys, but replace with whatever exists in user
                    ...prev,
                    firstName: data.user.firstName ?? data.user.firstname ?? data.user.first_name ?? data.user.username ?? '',
                    lastName: data.user.lastName ?? data.user.lastname ?? data.user.last_name ?? '',
                    class: data.user.class ?? data.user.userClass ?? data.user.user_class ?? '',
                    email: data.user.email ?? '',
                    address: data.user.address ?? '',
                    dob: data.user.dob ?? data.user.date_of_birth ?? '',
                    role: data.user.role ?? roleFromQuery ?? ''
                }));
            } else {
                alert(`Something went wrong: ${data && data.message ? data.message : 'Unknown error'}`);
            }
        })
        .catch((err) => {
            if (err.name !== 'AbortError') console.error(err);
        });

    return () => controller.abort();
}, [id, location.search]);
    */

    // =================================


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
            ? `${API_URL}/update_user.php?id=${id}`
            : `${API_URL}/registration.php`;
        const payload = id ? { id, ...formData } : formData;

        const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const data = await res.json();

        if (data.status === 'success') {
            alert(id ? "User updated successfully!" : "Registration successful!");
            if (!id) {
                setFormData({ firstName: "", lastName: "", class: "", email: "", address: "", dob: "", role: "" });
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
                                        name="class"
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


                                    <button className="btn registration_btn">
                                        <AppRegistrationRounded className='login_icons' />
                                        {id ? 'Update' : 'Register'}
                                    </button>

                                    {/* <button className="btn registration_btn"><AppRegistrationRounded className='login_icons' />Register</button> */}

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
