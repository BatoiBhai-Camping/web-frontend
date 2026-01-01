import { Pencil, Trash2 } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const packages = [
    {
        id: 1,
        title: "Blue Origin Farms",
        location: "Galle, Sri Lanka",
        days: "02 Days",
        address: "Galle to Colombo Road 245, Main Street, Galle",
        initialPayment: 200,
        totalPayment: 400,
        image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
        id: 2,
        title: "Konark Sun Temple",
        location: "Konark, Puri",
        days: "01 Days",
        address: "Galle to Colombo Road 245, Main Street, Galle",
        initialPayment: 100,
        totalPayment: 400,
        image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
        id: 3,
        title: "Konark Sun Temple",
        location: "Konark, Puri",
        days: "01 Days",
        address: "Galle to Colombo Road 245, Main Street, Galle",
        initialPayment: 100,
        totalPayment: 400,
        image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
        id: 4,
        title: "Konark Sun Temple",
        location: "Konark, Puri",
        days: "01 Days",
        address: "Galle to Colombo Road 245, Main Street, Galle",
        initialPayment: 100,
        totalPayment: 400,
        image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
        id: 5,
        title: "Konark Sun Temple",
        location: "Konark, Puri",
        days: "01 Days",
        address: "Galle to Colombo Road 245, Main Street, Galle",
        initialPayment: 100,
        totalPayment: 400,
        image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
]

export default function AllPackages() {
    return (
        <div className="w-full rounded-lg bg-gray-100 mt-2 p-6 flex flex-col gap-4">
            <div className="flex justify-between w-full">
                <h1 className="text-3xl font-bold">All Packages</h1>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by Packages" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Sort by</SelectLabel>
                            <SelectItem value="apple">Active</SelectItem>
                            <SelectItem value="banana">Inactive</SelectItem>
                            <SelectItem value="blueberry">Expencive</SelectItem>
                            <SelectItem value="grapes">Popular</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                    <div
                        key={pkg.id}
                        className="bg-white rounded-xl border shadow-sm hover:shadow-md transition"
                    >
                        {/* Image */}
                        <div className="relative">
                            <img
                                src={pkg.image}
                                alt={pkg.title}
                                className="h-48 w-full object-cover rounded-t-xl"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-2 flex flex-col items-start">
                            <h3 className="font-semibold text-base">
                                {pkg.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {pkg.location}
                            </p>

                            <p className="text-sm font-medium">{pkg.days}</p>

                            <p className="text-xs text-gray-500">
                                {pkg.address}
                            </p>

                            <div className="text-sm text-blue-600 mt-2">
                                <p>Initial Payment ${pkg.initialPayment}</p>
                                <p>Total Payment ${pkg.totalPayment}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-center gap-4 pt-3">
                                <button className="p-2 rounded-md border hover:bg-gray-100">
                                    <Pencil size={16} className="text-blue-600" />
                                </button>
                                <button className="p-2 rounded-md border hover:bg-red-50">
                                    <Trash2 size={16} className="text-red-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
