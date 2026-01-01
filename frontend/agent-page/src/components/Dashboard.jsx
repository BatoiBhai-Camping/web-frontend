import { Button } from "@/components/ui/button"
import { ExternalLink } from 'lucide-react';
import RevenueChart from "./RevenueChart";
import PackagesChart from "./PackagesChart";

export default function Dashboard() {
    return(
        <section className="bg-gray-100 w-full rounded-lg mt-2 p-4 flex flex-col gap-4">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <Button className="bg-[#165436] text-white transition duration-500 hover:scale-95">+ Add Package</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                <div className="bg-[#165436] transition-all duration-500 text-white hover:bg-white hover:text-black p-3 rounded-xl flex flex-col gap-2 items-start">
                    <h3 className=" font-semibold">Active Packages</h3>
                    <span className="text-3xl font-semibold">12</span>
                    <div className=" w-full flex justify-end">
                        <Button className="bg-[#fcfefc] border-2 border-[#165436] hover:bg-[#fcfefc] hover:scale-90"><ExternalLink className="text-[#165436] hover:text-white"/></Button>
                    </div>
                </div>
                <div className=" bg-white transition-all duration-500 text-black hover:bg-[#165436] hover:text-white p-3 rounded-xl flex flex-col gap-2 items-start">
                    <h3 className=" font-semibold">Total Packages</h3>
                    <span className="text-3xl font-semibold">21</span>
                    <div className=" w-full flex justify-end">
                        <Button className="bg-[#fcfefc] border-2 border-[#165436] hover:bg-[#fcfefc] hover:scale-90"><ExternalLink className="text-[#165436]"/></Button>
                    </div>
                </div>
                <div className=" bg-white transition-all duration-500 text-black hover:bg-[#165436] hover:text-white p-3 rounded-xl flex flex-col gap-2 items-start">
                    <h3 className=" font-semibold">New Bookings</h3>
                    <span className="text-3xl font-semibold">3</span>
                    <div className=" w-full flex justify-end">
                        <Button className="bg-[#fcfefc] border-2 border-[#165436] hover:bg-[#fcfefc] hover:scale-90"><ExternalLink className="text-[#165436]"/></Button>
                    </div>
                </div>
                <div className=" bg-white transition-all duration-500 text-black hover:bg-[#165436] hover:text-white p-3 rounded-xl flex flex-col gap-2 items-start">
                    <h3 className=" font-semibold ">Total Bookings</h3>
                    <span className="text-3xl font-semibold">50</span>
                    <div className=" w-full flex justify-end">
                        <Button className="bg-[#fcfefc] border-2 border-[#165436] hover:bg-[#fcfefc] hover:scale-90"><ExternalLink className="text-[#165436]"/></Button>
                    </div>
                </div>
                
            </div>
            <div className="flex justify-center gap-4 flex-wrap">
                <div className=" w-fit lg:w-1/2">
                    <RevenueChart/>
                </div>
                <div>
                    <PackagesChart/>
                </div>
            </div>
        </section>
    )
}