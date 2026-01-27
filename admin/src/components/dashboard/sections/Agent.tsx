"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  X,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  Star,
  TrendingUp,
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

interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  agency: string;
  bookings: number;
  revenue: number;
  rating: number;
  status: "active" | "inactive";
}

const dummyAgents: Agent[] = [
  {
    id: "1",
    name: "Sarah Travel",
    email: "sarah@agency.com",
    phone: "+1-555-0201",
    location: "New York",
    agency: "TravelPro",
    bookings: 156,
    revenue: 45000,
    rating: 4.8,
    status: "active",
  },
  {
    id: "2",
    name: "Mike Journey",
    email: "mike@agency.com",
    phone: "+1-555-0202",
    location: "Miami",
    agency: "VoyageWide",
    bookings: 89,
    revenue: 28500,
    rating: 4.5,
    status: "active",
  },
  {
    id: "3",
    name: "Lisa Adventure",
    email: "lisa@agency.com",
    phone: "+1-555-0203",
    location: "Los Angeles",
    agency: "GlobalTours",
    bookings: 203,
    revenue: 62000,
    rating: 4.9,
    status: "active",
  },
  {
    id: "4",
    name: "Tom Explorer",
    email: "tom@agency.com",
    phone: "+1-555-0204",
    location: "Chicago",
    agency: "PathFinder",
    bookings: 67,
    revenue: 18000,
    rating: 4.2,
    status: "inactive",
  },
  {
    id: "5",
    name: "Emma Vacation",
    email: "emma@agency.com",
    phone: "+1-555-0205",
    location: "Denver",
    agency: "TravelPro",
    bookings: 145,
    revenue: 41000,
    rating: 4.7,
    status: "active",
  },
];

export function AgentsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState<string | null>(null);

  const filteredAgents = useMemo(() => {
    return dummyAgents.filter((agent) => {
      const matchesSearch =
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.agency.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = !statusFilter || agent.status === statusFilter;
      const matchesLocation =
        !locationFilter || agent.location === locationFilter;

      return matchesSearch && matchesStatus && matchesLocation;
    });
  }, [searchQuery, statusFilter, locationFilter]);

  const locations = Array.from(new Set(dummyAgents.map((a) => a.location)));

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Header with search and filters */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search agents by name, email, or agency..."
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

          {/* Location filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
              >
                <MapPin className="w-4 h-4" />
                Location{" "}
                {locationFilter && (
                  <span className="ml-1 text-xs bg-primary text-primary-foreground rounded px-2">
                    1
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem
                onClick={() => setLocationFilter(null)}
                className={!locationFilter ? "bg-muted" : ""}
              >
                All Locations
              </DropdownMenuItem>
              {locations.map((location) => (
                <DropdownMenuItem
                  key={location}
                  onClick={() => setLocationFilter(location)}
                  className={locationFilter === location ? "bg-muted" : ""}
                >
                  {location}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Active filters display */}
          {(statusFilter || locationFilter) && (
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
              {locationFilter && (
                <Badge variant="secondary" className="gap-1">
                  {locationFilter}
                  <button
                    onClick={() => setLocationFilter(null)}
                    className="ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Agents list */}
      <div className="flex-1 overflow-y-auto">
        {filteredAgents.length > 0 ? (
          <div className="space-y-3">
            {filteredAgents.map((agent) => (
              <Card
                key={agent.id}
                className="p-4 hover:shadow-md transition cursor-pointer border border-border"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">
                        {agent.name}
                      </h3>
                      <Badge
                        className={
                          agent.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        <span className="capitalize text-xs">
                          {agent.status}
                        </span>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {agent.agency}
                    </p>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {agent.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {agent.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {agent.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 pt-3 border-t border-border text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Bookings</p>
                    <p className="font-semibold text-foreground">
                      {agent.bookings}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Revenue</p>
                    <p className="font-semibold text-foreground">
                      ${(agent.revenue / 1000).toFixed(1)}k
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Rating</p>
                    <p className="font-semibold text-foreground flex items-center gap-1">
                      {agent.rating}{" "}
                      <Star className="w-3 h-3 fill-secondary text-secondary" />
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Growth</p>
                    <p className="font-semibold text-green-600 flex items-center gap-1">
                      +12% <TrendingUp className="w-3 h-3" />
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">
              No agents found matching your filters
            </p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="border-t border-border pt-4 text-sm text-muted-foreground">
        <p>
          Showing{" "}
          <span className="font-semibold text-foreground">
            {filteredAgents.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-foreground">
            {dummyAgents.length}
          </span>{" "}
          agents
        </p>
      </div>
    </div>
  );
}
