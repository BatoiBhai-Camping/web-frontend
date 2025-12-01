import { Button } from "@/components/ui/button"

export default function Explore(params) {
    return (
        <section className=" overflow-hidden flex flex-col justify-center items-center mt-[250px] md:mt-[180px] lg:mt-[140px]">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-center">Explore Popular Cities</h1>
                <p className="text-sm text-center px-4">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit</p>
            </div>
            <div className="flex justify-start scroll-w-0 lg:justify-center gap-3 mt-8 mb-4 overflow-x-scroll w-[90vw]">
                <Button className=" text-[#495560] rounded-3xl hover:bg-[#7BBCB0] hover:text-white" variant="outline">Bhubaneswar</Button>
                <Button className=" text-[#495560] rounded-3xl hover:bg-[#7BBCB0] hover:text-white" variant="outline">Puri</Button>
                <Button className=" text-[#495560] rounded-3xl hover:bg-[#7BBCB0] hover:text-white" variant="outline">Sambalpur</Button>
                <Button className=" text-[#495560] rounded-3xl hover:bg-[#7BBCB0] hover:text-white" variant="outline">Koraput</Button>
                <Button className=" text-[#495560] rounded-3xl hover:bg-[#7BBCB0] hover:text-white" variant="outline">Mayurbhanj</Button>
                <Button className=" text-[#495560] rounded-3xl hover:bg-[#7BBCB0] hover:text-white" variant="outline">Berhampur</Button>
                <Button className=" text-[#495560] rounded-3xl hover:bg-[#7BBCB0] hover:text-white" variant="outline">Anugul</Button>
                <Button className=" text-[#495560] rounded-3xl hover:bg-[#7BBCB0] hover:text-white" variant="outline">Balasore</Button>
            </div>
            <div className="w-[80vw] h-[200px] md:h-[400px] lg:h-[500px] bg-[#7BBCB0] flex justify-center items-end overflow-visible">
                <div className="bg-white hidden md:absolute md:flex-row md:flex  gap-3 justify-between w-[70vw] h-fit lg:mb-[-120px] md:mb-[-100px] p-10 drop-shadow-xl drop-shadow-[#0000001F]">
                    <div className=" md:w-[45%] ">
                        <h1 className="text-3xl lg:text-4xl  font-semibold">Bhubaneswar</h1>
                        <p className="text-xs lg:text-sm mt-3">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                    </div>
                    <div className="w-max grid grid-cols-2 md:grid-cols-2 gap-2">
                        <span className="bg-white w-fit px-3 py-1 rounded-xs drop-shadow-md drop-shadow-[#00000014] text-xs">Public Transportations</span>
                        <span className="bg-white w-fit px-3 py-1 rounded-xs drop-shadow-md drop-shadow-[#00000014] text-xs">Nature & Adventure</span>
                        <span className="bg-white w-fit px-3 py-1 rounded-xs drop-shadow-md drop-shadow-[#00000014] text-xs">Business Tours</span>
                        <span className="bg-white w-fit px-3 py-1 rounded-xs drop-shadow-md drop-shadow-[#00000014] text-xs">Local Visit</span>
                        <span className="bg-white w-fit px-3 py-1 rounded-xs drop-shadow-md drop-shadow-[#00000014] text-xs">Private Transportations</span>
                    </div>
                </div>
            </div>
            <div className="bg-white md:hidden flex flex-wrap gap-3 w-[70vw] h-fit p-2">
                <div className=" md:w-[45%] ">
                    <h1 className="text-3xl lg:text-4xl  font-semibold">Bhubaneswar</h1>
                    <p className="text-xs lg:text-sm mt-3">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                </div>
                <div className="w-max grid grid-cols-2 md:grid-cols-2 gap-2">
                    <span className="bg-white w-fit px-3 py-1 rounded-xs drop-shadow-md drop-shadow-[#00000014] text-xs">Public Transportations</span>
                    <span className="bg-white w-fit px-3 py-1 rounded-xs drop-shadow-md drop-shadow-[#00000014] text-xs">Nature & Adventure</span>
                    <span className="bg-white w-fit px-3 py-1 rounded-xs drop-shadow-md drop-shadow-[#00000014] text-xs">Business Tours</span>
                    <span className="bg-white w-fit px-3 py-1 rounded-xs drop-shadow-md drop-shadow-[#00000014] text-xs">Local Visit</span>
                    <span className="bg-white w-fit px-3 py-1 rounded-xs drop-shadow-md drop-shadow-[#00000014] text-xs">Private Transportations</span>
                </div>
            </div>
        </section>
    )
}