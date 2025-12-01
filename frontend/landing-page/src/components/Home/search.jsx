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


export default function Search(params) {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(undefined)

    return (
        <div className=" absolute px-4 flex flex-col md:flex-row justify-center items-center flex-wrap gap-2 py-3 w-[80vw] bg-[#FFFFFF] rounded-lg shadow-[#7bbcb076] shadow-xl">
            <div className="grid w-[250px] md:w-[300px] lg:w-full max-w-sm items-center gap-3">
                <Label htmlFor="email" className="text-[#7BBCB0]">Location</Label>
                <Input className="border-0 focus-visible:ring-0 placeholder:text-[#000] w-full" type="email" id="email" placeholder="Search For A Destination" />
            </div>
            <div className="hidden lg:block h-5 w-0.5 rounded-lg bg-[#e8eaeb98]"/>
            <div className="flex flex-col gap-3 ">
                <Label htmlFor="date" className="px-1 text-[#7BBCB0]">Date</Label>
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
                            onSelect={(date) => {
                                setDate(date)
                                setOpen(false)
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="hidden lg:block h-5 w-0.5 rounded-lg bg-[#e8eaeb98]"/>
            <div>
                <Button variant="outline" className="bg-[#FFDA32] rounded-4xl px-8 shadow-[#ffd93244] shadow-lg">Search</Button>
            </div>
        </div>
    )
}