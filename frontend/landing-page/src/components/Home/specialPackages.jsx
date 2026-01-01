import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function SpecialPackages(params) {
    const categories = [
        "ALL CATAGORIES",
        "SCHOOL TRIP",
        "HOLIDAY TRIP",
        "HONEYMOON TRIP"
    ];
    const [active, setActive] = useState("ALL CATAGORIES");
    return (
        <section className="flex flex-col justify-center gap-6 px-6 md:px-10 py-10">
            <h1 className="text-2xl font-bold">Odisha Tour Packages</h1>
            <div className="h-[1px] w-full bg-[#CEDADF] " />
            <div className="flex gap-2 overflow-scroll scroll-w-0">
                {categories.map((item) => (
                    <Button
                        key={item}
                        onClick={() => setActive(item)}
                        variant="outline"
                        className={`rounded-3xl hover:bg-[#7BBCB0] hover:text-white ${active === item ? "bg-[#7BBCB0] text-white" : "bg-white text-[#495560]"}`}
                    >
                        {item}
                    </Button>
                ))}
            </div>
            <div>
                <div id="card" className="p-3 bg-[#ffff] shadow-lg w-[200px] flex flex-col gap-2">
                    <div className="bg-blue-400 h-[120px]"></div>
                    <div className="flex flex-col gap-1.5">
                        <h3 className="text-sm">Alaska: Westminster to Greenwich River Thames</h3>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-xs text-[#495560]">Duration 2 hours</span>
                            <span className="text-xs text-[#495560]">Transport Facility</span>
                            <span className="text-xs text-[#495560]">Family Plan</span>
                        </div>
                        <div className="h-[1px] w-full bg-[#CEDADF] " />
                        <div className="flex justify-end">
                            <div className="w-fit flex flex-col gap-0.5 justify-center"><h3 className="text-[#7BBCB0] text-lg font-semibold">$35.00</h3>
                            <span className="text-[10px] text-[#778088]">per person</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}