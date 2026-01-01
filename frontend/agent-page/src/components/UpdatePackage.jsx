import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function UpdatePackage(params) {
    return(
        <div className="w-full rounded-lg mt-2 p-6 flex flex-col items-center justify-center bg-gray-100">
                    <div className="flex justify-start w-full">
                        <h1 className="text-3xl font-bold">Update Package</h1>
                    </div>
                    <Card className="w-full mt-4 bg-white">
                        <CardContent className="space-y-8">
                            {/* Images & Videos */}
                            <section className="flex flex-col items-start">
                                <h3 className="font-semibold mb-4">Images</h3>
                                <div className="grid justify-items-center gap-2 grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
                                    <div className="h-32 w-full bg-amber-400 rounded-sm">
                                        <Input className="w-full h-full bg-transparent" type="file" multiple />
                                    </div>
                                    <div className="h-32 w-full bg-amber-400 rounded-sm">
                                        <Input className="w-full h-full bg-transparent" type="file" multiple />
                                    </div>
                                    <div className="h-32 w-full bg-amber-400 rounded-sm">
                                        <Input className="w-full h-full bg-transparent" type="file" multiple />
                                    </div>
                                    <div className="h-32 w-full bg-amber-400 rounded-sm">
                                        <Input className="w-full h-full bg-transparent" type="file" multiple />
                                    </div>
                                    <div className="h-32 w-full bg-amber-400 rounded-sm">
                                        <Input className="w-full h-full bg-transparent" type="file" multiple />
                                    </div>
                                </div>
                            </section>
        
                            {/* Basic Info */}
                            <section className="flex flex-col items-start">
                                <h3 className="font-semibold mb-4">Basic Info</h3>
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input placeholder="Package Name" />
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="tour">Tour</SelectItem>
                                            <SelectItem value="holiday">Holiday</SelectItem>
                                            <SelectItem value="pilgrimage">Pilgrimage</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </section>
        
                            {/* Pricing & Discount */}
                            <section className="flex flex-col items-start">
                                <h3 className="font-semibold mb-4">Pricing & Discount</h3>
                                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Input type="number" placeholder="Price (₹)" />
                                    <Input type="number" placeholder="Discount (%)" />
                                    <Input type="number" placeholder="Final Price (₹)" />
                                </div>
                            </section>
        
                            {/* Itinerary */}
                            <section className="flex flex-col items-start">
                                <h3 className="font-semibold mb-4">Itinerary</h3>
                                <Textarea placeholder="Day-wise itinerary details" rows={4} />
                            </section>
        
                            {/* Inclusions / Exclusions */}
                            <section className="flex flex-col items-start">
                                <h3 className="font-semibold mb-4">Inclusions / Exclusions</h3>
                                <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Textarea placeholder="Inclusions" rows={4} />
                                    <Textarea placeholder="Exclusions" rows={4} />
                                </div>
                            </section>
        
                            {/* Pickup Points */}
                            <section className="flex flex-col items-start">
                                <h3 className="font-semibold mb-4">Pickup Points</h3>
                                <Textarea placeholder="Enter pickup locations (comma separated)" />
                            </section>
        
                            {/* Terms & Conditions */}
                            <section className="flex flex-col items-start">
                                <h3 className="font-semibold mb-4">Terms & Conditions</h3>
                                <Textarea placeholder="Enter terms and conditions" rows={4} />
                            </section>
        
                            {/* Submit */}
                            <div className="flex justify-end gap-3">
                                <Button variant="outline">Cancel</Button>
                                <Button>Save Change</Button>
                            </div>
        
                        </CardContent>
                    </Card>
                </div>
    )
}