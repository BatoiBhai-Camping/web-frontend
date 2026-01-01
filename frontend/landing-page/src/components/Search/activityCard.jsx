import { useNavigate } from "react-router-dom";

export default function ActivityCard() {
    const navigate = useNavigate()
    return (
        <div onClick={()=>navigate("")} className="w-full border rounded-sm p-4 flex flex-col md:flex-row gap-4 shadow-sm bg-white">
            <div className="w-full md:w-1/4 h-40 md:h-32">
                <img
                    src="https://th.bing.com/th/id/OIP.qC2byAo3dj278_3hBk0kqwHaEA?w=295&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1"
                    alt="tour"
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="bg-[#7BBCB0] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        WATER ACTIVITIES
                    </span>
                    <div className="h-3 w-[1px] bg-[#C7CDD0]" />
                    <div className="flex items-center text-orange-400 text-sm">
                        ★★★★☆
                        <span className="text-gray-500 ml-1">(584 reviews)</span>
                    </div>
                </div>

                <h2 className="text-xl font-semibold mt-2">
                    Westminster to Greenwich River Thames
                </h2>

                <div className="flex items-center gap-6 mt-3 text-gray-600 text-sm">
                    <div className="flex items-center gap-1">
                        ⏱ <span>2 hours</span>
                    </div>
                    <div className="flex items-center gap-1">
                        🚗 <span>Transport</span>
                    </div>
                    <div className="flex items-center gap-1">
                        👥 <span>Family Plan</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center items-end min-w-[100px]">
                <span className="text-[#7BBCB0] font-bold text-lg">$35.00</span>
                <span className="text-[#778088] text-xs">per person</span>
            </div>
        </div>
    );
}