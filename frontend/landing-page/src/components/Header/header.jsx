import { Link } from "react-router-dom"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import { Button } from "@/components/ui/button"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { Separator } from "@/components/ui/separator"



export default function Header() {
    return (
        <header className=" sticky top-0 flex justify-between bg-white items-center px-5 py-3 z-50">
            <h1 className="text-xl font-bold">Batoi Bhai</h1>

            <NavigationMenu>
                <NavigationMenuList className="flex items-center gap-4">

                    <NavigationMenuItem className="hidden md:block">
                        <NavigationMenuLink asChild>
                            <Link to="/">Home</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    {/* Destinations Dropdown */}
                    <NavigationMenuItem className="relative hidden md:block">
                        <NavigationMenuTrigger className="text-sm font-[400]">Destinations</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[200px] gap-2 p-4">
                                <li><NavigationMenuLink asChild><Link>Puri</Link></NavigationMenuLink></li>
                                <li><NavigationMenuLink asChild><Link>Koraput</Link></NavigationMenuLink></li>
                                <li><NavigationMenuLink asChild><Link>Baripada</Link></NavigationMenuLink></li>
                                <li><NavigationMenuLink asChild><Link>Bhubaneswar</Link></NavigationMenuLink></li>
                                <li><NavigationMenuLink asChild><Link>Sambalpur</Link></NavigationMenuLink></li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Packages Dropdown */}
                    <NavigationMenuItem className="relative hidden md:block">
                        <NavigationMenuTrigger className="text-sm font-[400]">Packages</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[220px] gap-2 p-4">
                                <li><NavigationMenuLink asChild><Link>Puri Tour</Link></NavigationMenuLink></li>
                                <li><NavigationMenuLink asChild><Link>Triangle Package</Link></NavigationMenuLink></li>
                                <li><NavigationMenuLink asChild><Link>Green Baripada</Link></NavigationMenuLink></li>
                                <li><NavigationMenuLink asChild><Link>Honeymoon Stay</Link></NavigationMenuLink></li>
                                <li><NavigationMenuLink asChild><Link>Camping in Koraput</Link></NavigationMenuLink></li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Activities Dropdown */}
                    <NavigationMenuItem className="relative hidden md:block">
                        <NavigationMenuTrigger className="text-sm font-[400]">Activities</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[220px] gap-2 p-4">
                                <li><NavigationMenuLink asChild><Link>Cycling</Link></NavigationMenuLink></li>
                                <li><NavigationMenuLink asChild><Link>Camping</Link></NavigationMenuLink></li>
                                <li><NavigationMenuLink asChild><Link>Birding</Link></NavigationMenuLink></li>
                                <li><NavigationMenuLink asChild><Link>Boating</Link></NavigationMenuLink></li>
                                <li><NavigationMenuLink asChild><Link>Street Walk</Link></NavigationMenuLink></li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>


                    <NavigationMenuItem className="hidden md:block">
                        <NavigationMenuLink asChild>
                            <Link to="/help">Help</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <Button size="sm" variant="outline" className="bg-[#FFDA32] rounded-xs border-0 text-sm font-[500] px-6 py-4">Sign In</Button>
                    </NavigationMenuItem>

                    <NavigationMenuItem className="block md:hidden">
                        <Sheet>
                            <SheetTrigger>=</SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Batoi Bhai</SheetTitle>
                                </SheetHeader>
                                <div className="px-5 overflow-y-scroll">
                                    <Accordion type="single" collapsible>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>Destinations</AccordionTrigger>
                                            <AccordionContent>
                                                <ul className="grid w-[200px] gap-2 p-4">
                                                    <li><NavigationMenuLink asChild><Link>Puri</Link></NavigationMenuLink></li>
                                                    <li><NavigationMenuLink asChild><Link>Koraput</Link></NavigationMenuLink></li>
                                                    <li><NavigationMenuLink asChild><Link>Baripada</Link></NavigationMenuLink></li>
                                                    <li><NavigationMenuLink asChild><Link>Bhubaneswar</Link></NavigationMenuLink></li>
                                                    <li><NavigationMenuLink asChild><Link>Sambalpur</Link></NavigationMenuLink></li>
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                    <Accordion type="single" collapsible>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>Packages</AccordionTrigger>
                                            <AccordionContent>
                                                <ul className="grid w-[220px] gap-2 p-4">
                                                    <li><NavigationMenuLink asChild><Link>Puri Tour</Link></NavigationMenuLink></li>
                                                    <li><NavigationMenuLink asChild><Link>Triangle Package</Link></NavigationMenuLink></li>
                                                    <li><NavigationMenuLink asChild><Link>Green Baripada</Link></NavigationMenuLink></li>
                                                    <li><NavigationMenuLink asChild><Link>Honeymoon Stay</Link></NavigationMenuLink></li>
                                                    <li><NavigationMenuLink asChild><Link>Camping in Koraput</Link></NavigationMenuLink></li>
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                    <Accordion type="single" collapsible>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>Activities</AccordionTrigger>
                                            <AccordionContent>
                                                <ul className="grid w-[220px] gap-2 p-4">
                                                    <li><NavigationMenuLink asChild><Link>Cycling</Link></NavigationMenuLink></li>
                                                    <li><NavigationMenuLink asChild><Link>Camping</Link></NavigationMenuLink></li>
                                                    <li><NavigationMenuLink asChild><Link>Birding</Link></NavigationMenuLink></li>
                                                    <li><NavigationMenuLink asChild><Link>Boating</Link></NavigationMenuLink></li>
                                                    <li><NavigationMenuLink asChild><Link>Street Walk</Link></NavigationMenuLink></li>
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                    <Separator />
                                    <div className=" flex flex-col gap-2.5 mt-4">
                                        <li className=" list-none "><Link>Help</Link></li>
                                        <li className=" list-none "><Link>Contact Us</Link></li>
                                        <li className=" list-none "><Link>Customer Suppert</Link></li>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </NavigationMenuItem>

                </NavigationMenuList>
                {/* THIS IS REQUIRED */}
                <NavigationMenuViewport />
            </NavigationMenu>
        </header>
    )
}
