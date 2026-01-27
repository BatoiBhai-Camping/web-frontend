"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  X,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Package {
  id: string;
  name: string;
  destination: string;
  duration: number;
  price: number;
  bookings: number;
  status: "active" | "inactive";
  startDate: string;
  endDate: string;
  maxCapacity: number;
}

const dummyPackages: Package[] = [
  {
    id: "1",
    name: "European Summer Tour",
    destination: "Europe",
    duration: 14,
    price: 3500,
    bookings: 45,
    status: "active",
    startDate: "2024-06-01",
    endDate: "2024-06-15",
    maxCapacity: 50,
  },
  {
    id: "2",
    name: "Tokyo Adventure",
    destination: "Japan",
    duration: 10,
    price: 2800,
    bookings: 32,
    status: "active",
    startDate: "2024-05-10",
    endDate: "2024-05-20",
    maxCapacity: 40,
  },
  {
    id: "3",
    name: "Caribbean Paradise",
    destination: "Caribbean",
    duration: 7,
    price: 2200,
    bookings: 28,
    status: "active",
    startDate: "2024-04-15",
    endDate: "2024-04-22",
    maxCapacity: 35,
  },
  {
    id: "4",
    name: "Thai Exploration",
    destination: "Thailand",
    duration: 8,
    price: 1800,
    bookings: 18,
    status: "active",
    startDate: "2024-07-01",
    endDate: "2024-07-09",
    maxCapacity: 45,
  },
  {
    id: "5",
    name: "Australia Discovery",
    destination: "Australia",
    duration: 12,
    price: 4200,
    bookings: 15,
    status: "inactive",
    startDate: "2024-08-01",
    endDate: "2024-08-13",
    maxCapacity: 30,
  },
  {
    id: "6",
    name: "Dubai Luxury",
    destination: "UAE",
    duration: 5,
    price: 1500,
    bookings: 52,
    status: "active",
    startDate: "2024-03-20",
    endDate: "2024-03-25",
    maxCapacity: 55,
  },
  {
    id: "7",
    name: "Canadian Wilderness",
    destination: "Canada",
    duration: 9,
    price: 2600,
    bookings: 22,
    status: "active",
    startDate: "2024-06-20",
    endDate: "2024-06-29",
    maxCapacity: 40,
  },
];

export function PackagesSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<string | null>(null);

  const filteredPackages = useMemo(() => {
    return dummyPackages.filter((pkg) => {
      const matchesSearch =
        pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.destination.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = !statusFilter || pkg.status === statusFilter;

      let matchesPrice = true;
      if (priceFilter) {
        const [min, max] = priceFilter.split("-").map(Number);
        matchesPrice =
          pkg.price >= min && (max === 0 ? true : pkg.price <= max);
      }

      return matchesSearch && matchesStatus && matchesPrice;
    });
  }, [searchQuery, statusFilter, priceFilter]);

  const priceRanges = ["0-2000", "2000-3500", "3500-5000", "5000-0"];

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Header with search and filters */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search packages by name or destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {/* Status filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
              >
                <Filter className="w-4 h-4" />
                Status{" "}
                {statusFilter && (
                  <span className="ml-1 text-xs bg-primary text-primary-foreground rounded px-2">
                    1
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem
                onClick={() => setStatusFilter(null)}
                className={!statusFilter ? "bg-muted" : ""}
              >
                All Status
              </DropdownMenuItem>
              {["active", "inactive"].map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={statusFilter === status ? "bg-muted" : ""}
                >
                  <span className="capitalize">{status}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Price filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
              >
                <DollarSign className="w-4 h-4" />
                Price{" "}
                {priceFilter && (
                  <span className="ml-1 text-xs bg-primary text-primary-foreground rounded px-2">
                    1
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem
                onClick={() => setPriceFilter(null)}
                className={!priceFilter ? "bg-muted" : ""}
              >
                All Prices
              </DropdownMenuItem>
              {priceRanges.map((range) => (
                <DropdownMenuItem
                  key={range}
                  onClick={() => setPriceFilter(range)}
                  className={priceFilter === range ? "bg-muted" : ""}
                >
                  {range === "5000-0"
                    ? "$5000+"
                    : `$${range.split("-")[0]} - $${range.split("-")[1]}`}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Active filters display */}
          {(statusFilter || priceFilter) && (
            <div className="flex gap-2">
              {statusFilter && (
                <Badge variant="secondary" className="gap-1">
                  {statusFilter}
                  <button
                    onClick={() => setStatusFilter(null)}
                    className="ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {priceFilter && (
                <Badge variant="secondary" className="gap-1">
                  {priceFilter === "5000-0"
                    ? "$5000+"
                    : `$${priceFilter.split("-")[0]}-$${priceFilter.split("-")[1]}`}
                  <button onClick={() => setPriceFilter(null)} className="ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Packages list */}
      <div className="flex-1 overflow-y-auto">
        {filteredPackages.length > 0 ? (
          <div className="space-y-3">
            {filteredPackages.map((pkg) => {
              const occupancy = (pkg.bookings / pkg.maxCapacity) * 100;
              return (
                <Card
                  key={pkg.id}
                  className="p-4 hover:shadow-md transition cursor-pointer border border-border"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">
                          {pkg.name}
                        </h3>
                        <Badge
                          className={
                            pkg.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {pkg.status === "active" ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <Clock className="w-3 h-3 mr-1" />
                          )}
                          <span className="capitalize text-xs">
                            {pkg.status}
                          </span>
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {pkg.destination}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {pkg.duration} days
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />${pkg.price}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">
                            Occupancy
                          </span>
                          <span className="font-semibold text-foreground">
                            {pkg.bookings} / {pkg.maxCapacity}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-primary to-secondary h-full"
                            style={{ width: `${Math.min(occupancy, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                    <span>
                      {pkg.startDate} to {pkg.endDate}
                    </span>
                    <span>{occupancy.toFixed(0)}% Full</span>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">
              No packages found matching your filters
            </p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="border-t border-border pt-4 text-sm text-muted-foreground">
        <p>
          Showing{" "}
          <span className="font-semibold text-foreground">
            {filteredPackages.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-foreground">
            {dummyPackages.length}
          </span>{" "}
          packages
        </p>
      </div>
    </div>
  );
}
