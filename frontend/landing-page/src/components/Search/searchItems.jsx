import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import ActivityCard from "./activityCard"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"

export default function SearchPage(params) {
    const [data] = useSearchParams()
    const searchDate = data.get("date")
    const searchDestination = data.get("destination")
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(searchDate ? new Date(searchDate) : undefined)
    const [destination, setDestination] = useState(searchDestination)

    const [filter, setFilter] = useState(false)

    return (<>
        <section className="bg-white sticky top-0 left-0 border-t-2 flex justify-between items-center px-6 md:px-10 py-2 gap-2 flex-wrap">
            <div className=" w-full md:w-1/2 text-xl font-semibold ">Things to do in {destination}</div>
            <div className="flex justify-center items-center gap-2">
                <div className="text-[#1C2B38] md:hidden block " onClick={()=>setFilter(!filter)}>{filter?"X":"="} <span className="text-gray-500">{filter?"Close":"Filter"}</span></div>
                <div className="w-0.5 h-4 bg-[#C7CDD0] md:hidden block "/>
                <Select className=" rounded-3xl">
                    <SelectTrigger className="w-[150px] md:w-[220px] lg:w-[260px] rounded-[4px] border-0 focus:ring-0">
                        <SelectValue placeholder="Sort by:" />
                    </SelectTrigger>
                    <SelectContent className="rounded-[4px]">
                        <SelectItem value="light">Popularity</SelectItem>
                        <SelectItem value="dark">Price low to high</SelectItem>
                        <SelectItem value="system">Price high to low</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </section>
        <section className="bg-[#F9FAFD] flex justify-center gap-6 p-4">
            <div className={` ${filter?"block w-full":"hidden w-fit"} md:flex flex-col gap-3 `}>
                <div className="bg-white w-full p-4 flex flex-col gap-2 shadow-sm">
                    <h1 className="text-lg text-[#1C2B38]">Availability</h1>
                    <div className="w-full h-0.5 bg-[#F4F4F5]" />
                    <div className="flex flex-col items-start">
                        <Label htmlFor="email" className="text-[#1C2B38] text-sm">Location</Label>
                        <Input value={destination} onChange={e => setDestination(e.target.value)} className="border-0 focus-visible:ring-0 placeholder:text-[#000] w-full" type="email" id="email" placeholder="Search For A Destination" />
                    </div>
                    <div className="flex flex-col items-start">
                        <Label htmlFor="date" className="px-1 text-[#1C2B38] text-sm">Date</Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date"
                                    className="w-[250px] md:w-48 justify-between font-normal border-0 focus-visible:ring-0"
                                >
                                    {date ? date.toLocaleDateString() : "Pick a date"}
                                    <ChevronDownIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    captionLayout="dropdown"
                                    onSelect={(d) => {
                                        setDate(d)
                                        setOpen(false)
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className="bg-white w-full p-4 flex flex-col gap-2 shadow-sm">
                    <Accordion type="single" collapsible defaultValue="item-1">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Theme</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <Checkbox id="i1" />
                                    <Label htmlFor="i1">Water activities</Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Checkbox id="i2" />
                                    <Label htmlFor="i2">Food</Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Checkbox id="i3" />
                                    <Label htmlFor="i3">Nature</Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Checkbox id="i4" />
                                    <Label htmlFor="i4">Street art & grafitti</Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Checkbox id="i5" />
                                    <Label htmlFor="i5">Transport</Label>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className="bg-white w-full p-4 flex flex-col gap-2 shadow-sm">
                    <Accordion type="single" collapsible defaultValue="item-1">
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Duration</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <Checkbox id="D1" />
                                    <Label htmlFor="D1">Up to 1 hour</Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Checkbox id="D2" />
                                    <Label htmlFor="D2">1 to 4 hours</Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Checkbox id="D3" />
                                    <Label htmlFor="D3">4 hours to 1 day</Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Checkbox id="D4" />
                                    <Label htmlFor="D4">1 to 3 days</Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Checkbox id="D5" />
                                    <Label htmlFor="D5">3+ days</Label>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className="bg-white w-full p-4 flex justify-end gap-2 shadow-sm">
                    <Button size="sm" variant="outline" className="bg-[#FFDA32] rounded-xs border-0 text-sm font-[500] px-10 py-4">Apply</Button>
                </div>
            </div>
            <div className={`w-auto${filter?" hidden":" block"}  lg:w-[800px]`}>
                <ActivityCard />
            </div>
        </section>
    </>)
}


