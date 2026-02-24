import { Card } from '@/components/ui/card'
import { dummyStatistics, dummyAgents, dummyPackages, dummyPayments } from '@/dummyData'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#003DA5', '#0052CC', '#1E88E5', '#4A90E2', '#64B5F6']

export function StatisticsSection() {
  const stats = dummyStatistics

  // Calculate totals
  const totalBookings = dummyPayments.filter((p) => p.type === 'booking').length
  const totalRefunds = dummyPayments.filter((p) => p.type === 'refund').length
  const successPayments = dummyPayments.filter((p) => p.status === 'success').length
  const failedPayments = dummyPayments.filter((p) => p.status === 'failed').length

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="border-b border-border p-6 flex-shrink-0">
        <h2 className="text-2xl font-bold text-foreground">Platform Statistics</h2>
        <p className="text-muted-foreground mt-1">Overview of platform performance and analytics</p>
      </div>

      <div className="flex-1 p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 border-border">
            <p className="text-xs text-muted-foreground mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-primary">₹{stats.totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">All platforms</p>
          </Card>
          <Card className="p-4 border-border">
            <p className="text-xs text-muted-foreground mb-1">Total Bookings</p>
            <p className="text-2xl font-bold text-primary">{stats.totalBookings}</p>
            <p className="text-xs text-muted-foreground mt-1">Active</p>
          </Card>
          <Card className="p-4 border-border">
            <p className="text-xs text-muted-foreground mb-1">Total Users</p>
            <p className="text-2xl font-bold text-primary">{stats.totalUsers}</p>
            <p className="text-xs text-muted-foreground mt-1">Registered</p>
          </Card>
          <Card className="p-4 border-border">
            <p className="text-xs text-muted-foreground mb-1">Total Agents</p>
            <p className="text-2xl font-bold text-primary">{stats.totalAgents}</p>
            <p className="text-xs text-muted-foreground mt-1">Active</p>
          </Card>
        </div>

        {/* Revenue Trend Chart */}
        <Card className="p-6 border-border">
          <h3 className="font-bold text-foreground mb-4">Monthly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.revenueByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
                formatter={(value:any) => `₹${value.toLocaleString()}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#003DA5"
                strokeWidth={2}
                dot={{ fill: '#003DA5', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Payment Status Distribution */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-6 border-border">
            <h3 className="font-bold text-foreground mb-4">Payment Status Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={stats.paymentStatus}
                  dataKey="amount"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ status, count }:any) => `${status}: ${count}`}
                >
                  {stats.paymentStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value:any) => `₹${value.toLocaleString()}`}
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Booking Types */}
          <Card className="p-6 border-border">
            <h3 className="font-bold text-foreground mb-4">Booking & Refund Analysis</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="text-foreground font-medium">Total Bookings</span>
                <span className="text-primary font-bold text-lg">{totalBookings}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="text-foreground font-medium">Total Refunds</span>
                <span className="text-destructive font-bold text-lg">{totalRefunds}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-primary/5 rounded border border-primary/20">
                <span className="text-foreground font-medium">Success Rate</span>
                <span className="text-primary font-bold text-lg">
                  {dummyPayments.length > 0
                    ? `${Math.round((successPayments / dummyPayments.length) * 100)}%`
                    : '0%'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-destructive/5 rounded border border-destructive/20">
                <span className="text-foreground font-medium">Failed Transactions</span>
                <span className="text-destructive font-bold text-lg">{failedPayments}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Top Agents by Revenue */}
        <Card className="p-6 border-border">
          <h3 className="font-bold text-foreground mb-4">Top Travel Agents by Performance</h3>
          <div className="space-y-2">
            {dummyAgents.slice(0, 5).map((agent, index) => (
              <div key={agent.id} className="flex items-center justify-between p-3 bg-muted rounded">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-primary w-6">{index + 1}</span>
                  <div>
                    <p className="font-semibold text-foreground">{agent.name}</p>
                    <p className="text-xs text-muted-foreground">{agent.packages} packages</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">⭐ {agent.rating}</p>
                  <p className="text-xs text-muted-foreground">{agent.totalBookings} bookings</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Package Statistics */}
        <Card className="p-6 border-border">
          <h3 className="font-bold text-foreground mb-4">Top Packages by Bookings</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={dummyPackages.map((pkg) => ({
                name: pkg.name.substring(0, 15),
                bookings: pkg.bookings,
                price: pkg.price / 1000,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" angle={-45} textAnchor="end" height={100} />
              <YAxis yAxisId="left" stroke="var(--muted-foreground)" />
              <YAxis yAxisId="right" orientation="right" stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="bookings" fill="#003DA5" name="Bookings" />
              <Bar yAxisId="right" dataKey="price" fill="#1E88E5" name="Price (in ₹1000s)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
