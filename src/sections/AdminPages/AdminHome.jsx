import { useState, useEffect } from 'react';
import './AdminHome.css';
import Card from './../../components/card';
import TotalStudents from '../../assets/Images/students.png';
import TotalTeachers from '../../assets/Images/teachers.png';
import TotalExpenditure from '../../assets/Images/naira.png';
import Background2 from '../../components/background2';
import Chart from "react-apexcharts";
import { API_URL } from "../../api.js";

const AdminHome = () => {
    const [username, setUsername] = useState('');
    const [stats, setStats] = useState({
        students: { total: 0, active: 0, inactive: 0 },
        staff: { total: 0, active: 0, inactive: 0 },
        gender: { male: 0, female: 0 },
    });

    useEffect(() => {
        const storedUser = sessionStorage.getItem('username');
        if (storedUser) setUsername(storedUser);

        const fetchStats = async () => {
            try {
                const res = await fetch(`${API_URL}/api/dashboard_stats`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                });
                const data = await res.json();

                if (data.status === "success") {
                    // 🟩 Convert string numbers to actual numbers
                    const parsedGender = {
                        male: Number(data.data.gender.male) || 0,
                        female: Number(data.data.gender.female) || 0,
                    };

                    setStats({
                        ...data.data,
                        gender: parsedGender,
                    });
                } else {
                    console.error("Failed to fetch stats:", data.message);
                }
            } catch (err) {
                console.error("Error fetching dashboard stats:", err);
            }
        };

        fetchStats();
    }, []);

    // 🟢 Gender Chart Setup
    const studentGender = {
        series: [stats.gender.male, stats.gender.female],
        labels: ["Male", "Female"],
    };

    const studentGenderChart = {
        chart: {
            type: "donut",
        },
        labels: studentGender.labels,
        colors: ['#008FFB', '#FF4560'],
        legend: { position: "bottom" },
        dataLabels: { enabled: true },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: { width: 250 },
                    legend: { position: "bottom" },
                },
            },
        ],
    };

    // 🟢 Finance Chart
    const finance = { series: [50, 50], labels: ["Credit", "Debit"] };

    const financeChart = {
        chart: { type: "donut" },
        labels: finance.labels,
        colors: ['#00E396', '#FEB019'],
        legend: { position: "bottom" },
        dataLabels: { enabled: true },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: { width: 250 },
                    legend: { position: "bottom" },
                },
            },
        ],
    };

    return (
        <>
            <Background2 />
            <div className='admin_padding'>
                <div className='contents'>
                    <div className="page_Title">
                        <h4>Admin Dashboard</h4>
                        <div className="page_navigation">
                            <ul>
                                <li>Dashboard</li>
                                <li className='page_navigation-li'> / &nbsp; Admin Dashboard</li>
                            </ul>
                        </div>
                    </div>

                    <div className="page_welcome">
                        <h3>Welcome {username} to Admin dashboard</h3>
                        <p>Have a nice day!</p>
                    </div>

                    <div className="page_components">
                        <Card className='page_components-items'>
                            <div className='border_bottom'>
                                <div className='frame frame_bg-1'><img src={TotalStudents} alt="Students" /></div>
                                <div>
                                    <h3>{stats.students.total}</h3>
                                    <p>Total Students</p>
                                </div>
                            </div>
                            <div className='page_component-bottom'>
                                <p><span className='status_span'>Active:</span> {stats.students.active}</p>
                                <p><span className='status_span'>Inactive:</span> {stats.students.inactive}</p>
                            </div>
                        </Card>

                        <Card className='page_components-items'>
                            <div className='border_bottom'>
                                <div className='frame frame_bg-2'><img src={TotalTeachers} alt="Teachers" /></div>
                                <div>
                                    <h3>{stats.staff.total}</h3>
                                    <p>Total Staff</p>
                                </div>
                            </div>
                            <div className='page_component-bottom'>
                                <p><span className='status_span'>Active:</span> {stats.staff.active}</p>
                                <p><span className='status_span'>Inactive:</span> {stats.staff.inactive}</p>
                            </div>
                        </Card>

                        <Card className='page_components-items'>
                            <div className='border_bottom'>
                                <div className='frame frame_bg-3'><img src={TotalExpenditure} alt="Finance" /></div>
                                <div>
                                    <h3>N1,350,000</h3>
                                    <p>Finance</p>
                                </div>
                            </div>
                            <div className='page_component-bottom'>
                                <p><span className='status_span'>Credit:</span> N800,000</p>
                                <p><span className='status_span'>Debit:</span> N550,000</p>
                            </div>
                        </Card>
                    </div>

                    <div className="page_charts">
                        <div className="page_charts-items">
                            <h2>Students Gender Chart</h2>
                            <Chart
                                options={studentGenderChart}
                                series={studentGender.series}
                                type="donut"
                                width="320"
                            />
                        </div>

                        <div className="page_charts-items">
                            <h2>Finance Chart</h2>
                            <Chart
                                options={financeChart}
                                series={finance.series}
                                type="donut"
                                width="320"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminHome;
