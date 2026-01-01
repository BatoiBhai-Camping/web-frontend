import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Badge } from "@/components/ui/badge"
import { Pencil, BadgeCheckIcon} from 'lucide-react';


export default function Profile() {
    const [name, setName] = useState("Alexa Rawles")
    const [phone, setPhone] = useState(7381876799)
    const [address, setAddress] = useState("ZZZZZZ, XXXXX, MMMMM, YYYYY")
    const [description, setDescription] = useState("This is the end when you realised you are a dumb.")
    return (
        <section className="w-full p-6 flex flex-col items-center gap-2 bg-gray-100 mt-2 rounded-lg">
            <div className="flex justify-start w-full"><h1 className="text-3xl font-bold">Profile</h1></div>
            <Card className="w-full max-w-5xl rounded-2xl shadow-lg border border-gray-200 bg-white">
                <CardContent className="p-8">

                    {/* Top Section */}
                    <div className="flex flex-wrap-reverse gap-4 justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <div >
                                <img
                                    src="https://i.pravatar.cc/120"
                                    alt="profile"
                                    className="w-20 h-20 rounded-full object-cover"
                                />
                                <Badge variant="outline" className="p-1"><Pencil size={20} color="gray" /></Badge>
                            </div>
                            <div className="flex flex-col items-start gap-1">
                                <Input placeholder="Your First Name" value={name} onChange={(e) => setName(e.target.value)} />
                                <p className="text-sm px-1 text-gray-500">alexarawles@gmail.com</p>
                                <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600"><BadgeCheckIcon />Verified</Badge>
                            </div>
                        </div>

                        <Button className="px-6">Save</Button>
                    </div>

                    {/* Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-sm">Contact Number</label>
                            <Input placeholder="Your Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-sm">Description</label>
                            <Input placeholder="Your Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-sm">Address</label>
                            <Input placeholder="Your Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-sm">GST</label>
                            <Input placeholder="Your GST" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-sm">Aadhar</label>
                            <Input placeholder="XXXX XXXX XXXX" disabled />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-sm">PAN</label>
                            <Input placeholder="GPY567A9" disabled />
                        </div>

                    </div>

                </CardContent>
            </Card>
        </section>
    );
}
