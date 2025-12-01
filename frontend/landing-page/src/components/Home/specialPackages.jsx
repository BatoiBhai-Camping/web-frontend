import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function SpecialPackages(params) {
    const categories = [
        "CATAGORIES",
        "SCHOOL TRIP",
        "HOLIDAY TRIP",
        "HONEYMOON TRIP"
    ];
    const [active, setActive] = useState("CATAGORIES");
    return (
        <section className="flex flex-col justify-center gap-6 px-6 md:px-10 py-10">
            <h1 className="text-2xl font-bold">Odisha Tour Packages</h1>
            <div className="h-[1px] w-full bg-[#CEDADF] " />
            <div className="flex gap-2">
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
                <div id="card" className="p-4 bg-[#ffff] shadow-2xl ">
                    <div className="bg-blue-400 w-[180px] h-[120px]"></div>
                    <div>
                        <h3 className="text-sm">Alaska: Westminster to Greenwich River Thames</h3>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-xs">Duration 2 hours</span>
                            <span className="text-xs">Transport Facility</span>
                            <span className="text-xs">Family Plan</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}