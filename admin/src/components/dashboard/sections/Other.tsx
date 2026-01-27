"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  X,
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  Calendar,
  Users,
  Zap,
  Activity,
  BarChart3,
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
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sub-admins Section
interface SubAdmin {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: "active" | "inactive";
  joinDate: string;
}

const dummySubAdmins: SubAdmin[] = [
  {
    id: "1",
    name: "James Manager",
    email: "james@admin.com",
    phone: "+1-555-0301",
    role: "Content Manager",
    status: "active",
    joinDate: "2023-06-15",
  },
  {
    id: "2",
    name: "Patricia Admin",
    email: "patricia@admin.com",
    phone: "+1-555-0302",
    role: "Support Lead",
    status: "active",
    joinDate: "2023-08-20",
  },
  {
    id: "3",
    name: "Robert Support",
    email: "robert@admin.com",
    phone: "+1-555-0303",
    role: "Analytics",
    status: "inactive",
    joinDate: "2023-10-05",
  },
];

export function SubAdminsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredSubAdmins = useMemo(() => {
    return dummySubAdmins.filter((admin) => {
      const matchesSearch =
        admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = !statusFilter || admin.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search sub-admins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
              >
                <Filter className="w-4 h-4" />
                Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                All Status
              </DropdownMenuItem>
              {["active", "inactive"].map((s) => (
                <DropdownMenuItem key={s} onClick={() => setStatusFilter(s)}>
                  <span className="capitalize">{s}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3">
        {filteredSubAdmins.map((admin) => (
          <Card key={admin.id} className="p-4 border border-border">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-foreground">{admin.name}</h3>
                <p className="text-sm text-muted-foreground">{admin.role}</p>
              </div>
              <Badge
                className={
                  admin.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }
              >
                {admin.status}
              </Badge>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {admin.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {admin.phone}
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
              Joined: {admin.joinDate}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Payments Section
interface Payment {
  id: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
  date: string;
  paymentMethod: string;
}

const dummyPayments: Payment[] = [
  {
    id: "1",
    transactionId: "TXN001",
    amount: 2500,
    currency: "USD",
    status: "completed",
    date: "2024-03-15",
    paymentMethod: "Credit Card",
  },
  {
    id: "2",
    transactionId: "TXN002",
    amount: 1800,
    currency: "USD",
    status: "completed",
    date: "2024-03-14",
    paymentMethod: "PayPal",
  },
  {
    id: "3",
    transactionId: "TXN003",
    amount: 3200,
    currency: "USD",
    status: "pending",
    date: "2024-03-13",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "4",
    transactionId: "TXN004",
    amount: 950,
    currency: "USD",
    status: "completed",
    date: "2024-03-12",
    paymentMethod: "Credit Card",
  },
  {
    id: "5",
    transactionId: "TXN005",
    amount: 4100,
    currency: "USD",
    status: "failed",
    date: "2024-03-11",
    paymentMethod: "Debit Card",
  },
];

export function PaymentsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredPayments = useMemo(() => {
    return dummyPayments.filter((p) => {
      const matchesSearch = p.transactionId.includes(searchQuery);
      const matchesStatus = !statusFilter || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const total = filteredPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search transaction ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
              >
                <Filter className="w-4 h-4" />
                Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                All Status
              </DropdownMenuItem>
              {["completed", "pending", "failed"].map((s) => (
                <DropdownMenuItem key={s} onClick={() => setStatusFilter(s)}>
                  <span className="capitalize">{s}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3">
        {filteredPayments.map((payment) => (
          <Card key={payment.id} className="p-4 border border-border">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-foreground">
                  {payment.transactionId}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {payment.paymentMethod}
                </p>
              </div>
              <Badge
                className={
                  payment.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : payment.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }
              >
                {payment.status}
              </Badge>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">{payment.date}</span>
              <span className="font-semibold text-foreground">
                ${payment.amount.toFixed(2)}
              </span>
            </div>
          </Card>
        ))}
      </div>
      <div className="border-t border-border pt-4 text-sm">
        <p>
          Total:{" "}
          <span className="font-semibold text-foreground text-lg">
            ${total.toFixed(2)}
          </span>
        </p>
      </div>
    </div>
  );
}

// Reviews Section
interface Review {
  id: string;
  author: string;
  packageName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

const dummyReviews: Review[] = [
  {
    id: "1",
    author: "John Traveler",
    packageName: "European Summer Tour",
    rating: 5,
    comment: "Amazing experience! Highly recommended.",
    date: "2024-03-10",
    verified: true,
  },
  {
    id: "2",
    author: "Sarah Explorer",
    packageName: "Tokyo Adventure",
    rating: 4,
    comment: "Great tour, but wish there was more free time.",
    date: "2024-03-08",
    verified: true,
  },
  {
    id: "3",
    author: "Mike Adventurer",
    packageName: "Caribbean Paradise",
    rating: 5,
    comment: "Perfect vacation! The guides were excellent.",
    date: "2024-03-05",
    verified: true,
  },
  {
    id: "4",
    author: "Lisa Wanderer",
    packageName: "Thai Exploration",
    rating: 3,
    comment: "Good but some activities were rushed.",
    date: "2024-03-02",
    verified: false,
  },
];

export function ReviewsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState<string | null>(null);

  const filteredReviews = useMemo(() => {
    return dummyReviews.filter((r) => {
      const matchesSearch =
        r.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.packageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.comment.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRating =
        !ratingFilter || r.rating === parseInt(ratingFilter);
      return matchesSearch && matchesRating;
    });
  }, [searchQuery, ratingFilter]);

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
              >
                <Filter className="w-4 h-4" />
                Rating
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setRatingFilter(null)}>
                All Ratings
              </DropdownMenuItem>
              {[5, 4, 3, 2, 1].map((r) => (
                <DropdownMenuItem
                  key={r}
                  onClick={() => setRatingFilter(r.toString())}
                >
                  {"⭐".repeat(r)} ({r} stars)
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="p-4 border border-border">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">
                  {review.author}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {review.packageName}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-lg">{"⭐".repeat(review.rating)}</span>
                {review.verified && (
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    Verified
                  </Badge>
                )}
              </div>
            </div>
            <p className="text-sm text-foreground mb-2">{review.comment}</p>
            <p className="text-xs text-muted-foreground">{review.date}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Statistics Section
const chartData = [
  { month: "Jan", bookings: 120, revenue: 28000 },
  { month: "Feb", bookings: 145, revenue: 35500 },
  { month: "Mar", bookings: 165, revenue: 42000 },
  { month: "Apr", bookings: 198, revenue: 51200 },
  { month: "May", bookings: 221, revenue: 58500 },
  { month: "Jun", bookings: 245, revenue: 62000 },
];

const pieData = [
  { name: "Users", value: 1250 },
  { name: "Agents", value: 85 },
  { name: "Packages", value: 342 },
];

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
];

export function StatisticsSection() {
  return (
    <div className="space-y-6 h-full overflow-y-auto pb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold text-foreground">1,250</p>
            </div>
            <Users className="w-8 h-8 text-primary" />
          </div>
        </Card>
        <Card className="p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Bookings</p>
              <p className="text-2xl font-bold text-foreground">245</p>
            </div>
            <Calendar className="w-8 h-8 text-accent" />
          </div>
        </Card>
        <Card className="p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold text-foreground">$62k</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Agents</p>
              <p className="text-2xl font-bold text-foreground">82</p>
            </div>
            <Zap className="w-8 h-8 text-yellow-500" />
          </div>
        </Card>
      </div>

      <Card className="p-6 border border-border">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Bookings & Revenue Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
              }}
            />
            <Line
              type="monotone"
              dataKey="bookings"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))", r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--secondary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--secondary))", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-6 border border-border">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Monthly Revenue
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
              />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                }}
              />
              <Bar dataKey="revenue" fill="hsl(var(--secondary))" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 border border-border">
          <h3 className="font-semibold text-foreground mb-4">
            Platform Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
