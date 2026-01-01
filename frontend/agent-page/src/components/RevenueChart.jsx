import { useEffect, useRef } from "react"
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler
} from "chart.js"

// Register chart.js components
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler
)

export default function RevenueChart() {
  const chartRef = useRef(null)
  const chartInstanceRef = useRef(null)

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d")

    // Destroy previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy()
    }

    // Create Chart
    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Earnings",
            data: [0, 5000, 60000, 90000, 120000, 50000],
            borderWidth: 2,
            fill: true,
            borderColor: '#165436',
            tension: 0,
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    })
  }, [])

  return (
    <div className="p-4 bg-white border rounded-lg">
      <h3 className="text-lg font-semibold">Total Earnings</h3>
      <canvas ref={chartRef}></canvas>
    </div>
  )
}
