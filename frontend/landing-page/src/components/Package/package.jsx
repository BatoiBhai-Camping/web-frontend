import { useState } from "react";
import BookingCard from "./bookingCard";
import Feature from "./feature";
import Section from "./section";
import { CalendarDays, CheckCircle, Clock, Phone } from "lucide-react";

export default function Package(params) {
    const [images, setImages] = useState([
        { url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e", active: true },
        { url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee", active: false },
        { url: "https://images.unsplash.com/photo-1500048993956-dc1c7b6d5934", active: false },
        { url: "https://images.unsplash.com/photo-1500534623283-312aade485b7", active: false },
        { url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429", active: false },
    ]);

    const activeImage = images.find(img => img.active);


    return (<>
        <section className="w-full bg-gray-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Vintage Double Decker Bus Tour & Thames River Cruise
                </h1>
                <p className="text-sm text-gray-500 mt-1">📍 Gothenburg | ⭐ 4.8 (248 reviews)</p>

                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-8">

                    {/* LEFT CONTENT */}
                    <div className="lg:col-span-2">

                        {/* Main Image */}
                        <img
                            src={activeImage?.url}
                            alt="tour"
                            className="w-full h-80 md:h-96 object-cover rounded-lg shadow"
                        />

                        {/* Gallery */}
                        <div className="grid grid-cols-5 gap-2 mt-4">
                            {images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img.url}
                                    className="h-20 object-cover rounded-md"
                                    onClick={() => {
                                        const updated = images.map((item, i) => ({
                                            ...item,
                                            active: i === index,
                                        }));
                                        setImages(updated);
                                    }}
                                />
                            ))}
                        </div>

                        {/* Highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
                            <Feature icon={<CheckCircle />} title="Free Cancellation" text="Cancel up to 24 hours in advance" />
                            <Feature icon={<CalendarDays />} title="Health Precautions" text="Special health and safety measures apply" />
                            <Feature icon={<Clock />} title="Duration 3.5 Hours" text="Flexible starting times" />
                            <Feature icon={<CheckCircle />} title="English Guide" text="Live guide included" />
                        </div>

                        {/* Description */}
                        <Section title="Description">
                            <p className="mb-4">
                                See the highlights of London via 2 classic modes of transport...
                            </p>
                            <p>
                                Next, take a short trip along the River Thames, passing Shakespeare’s Globe...
                            </p>
                        </Section>

                        {/* Activity */}
                        <Section title="Activity">
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Explore London on a vintage double decker bus</li>
                                <li>Cruise along the River Thames</li>
                                <li>See Changing of the Guard</li>
                                <li>London Eye views</li>
                            </ul>
                        </Section>

                        {/* Included */}
                        <Section title="What’s Included / Not Included">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Included</h3>
                                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                        <li>Double-decker bus tour</li>
                                        <li>River Thames cruise</li>
                                        <li>Guide in English</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Not Included</h3>
                                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                        <li>Food & beverages</li>
                                        <li>Hotel pick-up</li>
                                    </ul>
                                </div>
                            </div>
                        </Section>

                    </div>

                    {/* RIGHT SIDEBAR */}
                    <BookingCard />

                </div>
            </div>
        </section>
    </>)
}