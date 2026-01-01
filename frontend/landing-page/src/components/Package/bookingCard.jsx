import { CalendarDays, CheckCircle, Clock, Phone } from "lucide-react";
import { useState } from "react";

export default function BookingCard() {
    const [count, setCount] = useState(1);

    const increment = () => setCount(prev => prev + 1);

    const decrement = () => {
        if (count > 1) setCount(prev => prev - 1);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 w-full h-fit fixed left-0 top-[calc(100vh-230px)] lg:sticky lg:top-16 border">
            <h3 className="text-xl font-semibold mb-4 text-center lg:text-start">Booking</h3>

            {/* Dates */}
            <div className="space-y-3 flex justify-center lg:flex-col gap-2">
                <div>
                    <label className="text-sm font-medium">On</label>
                    <input type="date" className="w-full mt-1 border rounded-lg px-3 py-2" />
                </div>
                <div>
                    <label className="text-sm font-medium">No. of Guests</label>
                    <div className=" gap-3 w-full flex justify-center items-center p-2 border rounded-lg bg-white">

                        <button onClick={decrement}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">-</button>
                        <input
                            type="text"
                            value={`${count} adults`}
                            min={1}
                            onChange={(e) => setCount(Math.max(1, Number(e.target.value)))}
                            className="w-20 text-center border rounded-md py-1 px-1"
                        />
                        <button onClick={increment}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">+</button>

                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:flex lg:flex-col">
                {/* Price */}
                <p className="text-center mt-5 text-[#7BBCB0] font-extrabold text-xl lg:text-3xl">
                    $78.90
                </p>

                {/* Buttons */}
                <button className="w-full bg-[#7BBCB0] text-white mt-5 py-2 rounded-lg font-medium hover:bg-green-700">
                    Confirm Booking
                </button>

                {/* <button className="w-full border mt-3 py-2 rounded-lg font-medium">
                    ❤️ Save to Wishlist
                </button> */}
            </div>
        </div>
    );
}