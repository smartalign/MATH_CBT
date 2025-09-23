import React, { useState } from "react";
import Chart from "react-apexcharts";

const DashboardDonut = () => {
    const datasets = {
        series: [50, 50],
        labels: ["Male", "Female"],
    };

    const chartOptions = {
        chart: {
            type: "donut",
        },
        labels: datasets.labels,
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
        <div className="components">
            <h2 className="">Gender Chart</h2>

            {/* Donut Chart */}
            <Chart
                options={chartOptions}
                series={datasets.series}
                type="donut"
                width="380"
            />

        </div>
    );
};

export default DashboardDonut;
