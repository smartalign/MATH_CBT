import { useState, useEffect } from 'react';
import './AdminHome.css'
import { Dashboard } from '@mui/icons-material';
import Card from './../../components/card';
import TotalStudents from '../../assets/Images/students.png';
import TotalTeachers from '../../assets/Images/teachers.png';
import TotalExpenditure from '../../assets/Images/naira.png';
import Background2 from '../../components/background2';
import Chart from "react-apexcharts";

const AdminHome = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUser = sessionStorage.getItem('username');
        if (storedUser) {
            setUsername(storedUser);
        }
    }, []);

    // Apex gender chart function begins 
    const studentGender = {
        series: [50, 50],
        labels: ["Male", "Female"],
    };

    const studentGenderChart = {
        chart: {
            type: "donut",
        },
        labels: studentGender.labels,
        legend: {
            position: "bottom",
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 250,
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
    };

    // finance chart begins here

    const finance = {
        series: [50, 50],
        labels: ["Credit", "Debit"],
    };

    const financeChart = {
        chart: {
            type: "donut",
        },
        labels: finance.labels,
        legend: {
            position: "bottom",
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 250,
                    },
                    legend: {
                        position: "bottom",
                    },
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
                        <h3>Welcome  {username} to Admin dashboard</h3><br />
                        <p>Have a nice day!</p>
                    </div>

                    {/* 
                    this is where my sticky setup begins
                    <div className='test'>
                        <div className="sticky_left">
                            <h2>texting</h2>

                        </div>

                        <div className='sticky_right'>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia necessitatibus, eaque libero nobis, adipisci autem neque magnam quos dignissimos tenetur unde enim, commodi ex itaque accusamus! Perspiciatis ut omnis mollitia doloremque adipisci alias vero sint sit minima nulla. Dolorem laborum earum dolor quos vel ipsa ullam, atque magni repellat. Ex omnis aliquid dolorem id doloribus labore ad ab, fugit distinctio sunt? Qui enim itaque magni cupiditate nisi dicta, nam sequi ab accusamus similique corporis sit laudantium? Cum impedit voluptatum numquam enim quod placeat repudiandae? Molestias, sit natus officia magni, nobis voluptas, laboriosam in a consectetur voluptatum tenetur blanditiis quasi earum voluptate eum dignissimos eos quae? Alias impedit, fugit beatae asperiores libero eos quae, laboriosam hic debitis ea pariatur minima incidunt aspernatur quidem nulla fugiat ipsum! Quisquam magni tenetur asperiores quam illo, et perspiciatis? Ad atque facere libero aliquid, vitae ea dolore culpa esse nisi optio, quidem cupiditate quaerat, rerum voluptatem mollitia animi. Esse voluptas, magni fugit aperiam id optio. Iure mollitia neque perspiciatis. Aspernatur voluptas impedit, veritatis, perspiciatis explicabo culpa amet asperiores saepe magni et officiis dolor provident. Explicabo deleniti totam velit! Repellendus incidunt impedit quisquam, eveniet aliquam beatae, quidem officia mollitia fugiat, quos dolorum amet delectus similique laborum sunt.
                        </div>
                    </div> */}



                    <div className="page_components">
                        <Card className='page_components-items'>
                            <div className='border_bottom'>
                                <div className='frame frame_bg-1'><img src={TotalStudents} alt="Students icon" /></div>
                                <div>
                                    <h3>3654</h3>
                                    <p>Total Students</p>
                                </div>
                            </div>

                            <div className='page_component-bottom'>
                                <div className='status'>
                                    <p><span className='status_span'>Active : </span> 3643</p>
                                </div>
                                <div className='status'>
                                    <p><span className='status_span'>Inactive : </span> 11</p>
                                </div>
                            </div>
                        </Card>

                        <Card className='page_components-items'>
                            <div className='border_bottom'>
                                <div className='frame frame_bg-2'><img src={TotalTeachers} alt="Teachers icon" /></div>
                                <div>
                                    <h3>284</h3>
                                    <p>Total Staffs</p>
                                </div>
                            </div>

                            <div className='page_component-bottom'>
                                <div className='status'>
                                    <p><span className='status_span'>Active : </span> 254</p>
                                </div>
                                <div className='status'>
                                    <p><span className='status_span'>Inactive : </span> 30</p>
                                </div>
                            </div>
                        </Card>

                        <Card className='page_components-items'>
                            <div className='border_bottom'>
                                <div className='frame frame_bg-3'><img src={TotalExpenditure} alt="Earnings icon" /></div>
                                <div>
                                    <h3>N1,350,000</h3>
                                    <p>Finance</p>
                                </div>
                            </div>

                            <div className='page_component-bottom'>
                                <div className='status'>
                                    <p><span className='status_span'>Credit : </span> N800,000</p>
                                </div>
                                <div className='status'>
                                    <p><span className='status_span'>Debit : </span> N550,000</p>
                                </div>
                            </div>
                        </Card>

                    </div>

                    <div className="page_charts">
                        <div className="page_charts-items">
                            <h2>Students Gender Chart</h2>

                            {/* Donut Chart */}
                            <Chart
                                options={studentGenderChart}
                                series={studentGender.series}
                                type="donut"
                                width="300"
                            />

                        </div>

                        <div className="page_charts-items">
                            <h2>Finance Chart</h2>

                            {/* Donut Chart */}
                            <Chart
                                options={financeChart}
                                series={finance.series}
                                type="donut"
                                width="300"
                            />

                        </div>

                    </div>





                </div>
            </div>
        </>

    )
};

export default AdminHome;
