import { Calendar } from "lucide-react";
import { useState } from "react";

export default function BillCard(params) {
    const today = new Date().toISOString().split("T")[0];
    const [Fromdate, setFromDate] = useState(today);
    const [Todate, setToDate] = useState(today);
    const [days, setDays] = useState(0)
    return (<>
        {/* Title */}
        <h1 className="text-3xl font-bold text-center">Booking Information</h1>
        <p className="text-gray-500 text-center mt-1">
            Please fill up the blank fields below
        </p>

        <div className="flex flex-col md:flex-row mt-10 gap-10">
            {/* Image Section */}
            <div>
                <img
                    src="/booking.jpg" // change to your real image
                    className="w-[350px] h-[220px] object-cover rounded-xl shadow"
                    alt="resort"
                />
                <div className="mt-3">
                    <h2 className="font-medium text-lg">Blue Origin Fams</h2>
                    <p className="text-gray-500 text-sm">Galle, Sri Lanka</p>
                </div>
            </div>

            {/* Right Form */}
            <div className="border-l border-gray-200 pl-10">
                {/* Days counter */}
                <p className="font-semibold text-gray-700">How long you will stay?</p>

                <div className="flex items-center gap-3 mt-2">
                    <button
                        onClick={() => setDays(days - 1)}
                        className="w-8 h-8 bg-[#E74C3C] text-white rounded flex items-center justify-center text-xl"
                    >
                        -
                    </button>

                    <span className="text-gray-700 font-medium">{days} Days</span>

                    <button
                        onClick={() => setDays(days + 1)}
                        className="w-8 h-8 bg-[#1ABC9C] text-white rounded flex items-center justify-center text-xl"
                    >
                        +
                    </button>
                </div>

                {/* Date Picker UI */}
                <p className="font-semibold text-gray-700 mt-6">Pick a Date</p>

                <div className="flex items-center gap-2 mt-2 border rounded-lg px-3 py-2 w-60">
                    <Calendar />
                    <span className="text-gray-700">{Fromdate} - {Todate}</span>
                </div>

                {/* Price */}
                <div className="mt-8">
                    <p className="text-gray-400">You will pay</p>
                    {/* <p className="text-xl font-semibold">
                            ${totalPrice} USD{" "}
                            <span className="text-gray-600 text-base">per {days} Days</span>
                        </p> */}
                </div>
            </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col mt-10 gap-3 w-full max-w-xs">
            <button className="bg-blue-600 text-white rounded-lg py-3 font-medium hover:bg-blue-700">
                Pay Now
            </button>
            <button className="bg-gray-200 text-gray-700 rounded-lg py-3 font-medium hover:bg-gray-300">
                Cancel
            </button>
        </div></>)
}