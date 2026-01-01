import { useState } from "react";
import BillCard from "./billCard";
import PaymentCard from "./paymentCard";
import MsgCard from "./messageCard";

export default function BillPage(params) {
    const [st, setSt] = useState(3)
    
    return (<section>
        <div className="min-h-screen bg-white flex flex-col items-center py-10">
            {/* Header Progress */}
            <div className="flex items-center gap-6 mb-10">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1ABC9C] text-white">
                    ✓
                </div>
                <div className={`w-10 h-10 flex items-center justify-center rounded-full ${st<2?("bg-gray-200 text-gray-700"):("bg-[#1ABC9C] text-white")}`}>
                    {st<2?"2":"✓"}
                </div>
                <div className={`w-10 h-10 flex items-center justify-center rounded-full ${st<3?("bg-gray-200 text-gray-700"):("bg-[#1ABC9C] text-white")}`}>
                    {st<3?"3":"✓"}
                </div>
            </div>
            {st<2?(<BillCard/>):(st<3?(<PaymentCard/>):(<MsgCard/>))}
        
        </div>

    </section>)
}