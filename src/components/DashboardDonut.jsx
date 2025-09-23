import React, { useState } from "react";
import Chart from "react-apexcharts";

const DashboardDonut = () => {
    const datasets = {
        sales: {
            series: [120, 90, 50, 30],
            labels: ["Electronics", "Clothing", "Books", "Others"],
        },
        expenses: {
            series: [200, 150, 70],
            labels: ["Salaries", "Marketing", "Operations"],
        },
        users: {
            series: [300, 150, 50],
            labels: ["Active Users", "Inactive Users", "New Signups"],
        },
    };

    const [activeData, setActiveData] = useState("sales");

    const chartOptions = {
        chart: {
            type: "donut",
        },
        labels: datasets[activeData].labels,
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
        <div className="p-4 max-w-md mx-auto shadow-lg rounded-2xl bg-white">
            <h2 className="text-xl font-bold mb-4 capitalize">{activeData} Overview</h2>

            {/* Donut Chart */}
            <Chart
                options={chartOptions}
                series={datasets[activeData].series}
                type="donut"
                width="380"
            />

            {/* Dataset Switch Buttons */}
            <div className="flex justify-around mt-4">
                {Object.keys(datasets).map((key) => (
                    <button
                        key={key}
                        onClick={() => setActiveData(key)}
                        className={`px-4 py-2 rounded-xl font-medium ${activeData === key
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700"
                            }`}
                    >
                        {key}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DashboardDonut;
