import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function PackagesChart() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext("2d");

        chartInstance.current = new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["Bali Tour", "Goa Tour", "Odisha Tour", "Thailand Tour"],
                datasets: [
                    {
                        label: "Package Wise Earnings",
                        data: [50000, 30000, 4000, 2000], 
                        backgroundColor: [
                            "#227d53",
                            "#13452d",
                            "#337740",
                            "#edf6dd"
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "bottom",
                    }
                }
            }
        });
    }, []);

    return (
        <div className="w-fit p-4 bg-white border rounded-lg">
            <h3 className="text-lg font-semibold">Total Earnings</h3>
            <canvas ref={chartRef} />
        </div>
    );
}
