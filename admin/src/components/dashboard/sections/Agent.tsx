'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { dummyAgents } from '@/dummyData'

interface AgentsListProps {
  onAgentClick: (agentId: string) => void
}

export function AgentsList({ onAgentClick }: AgentsListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const filteredAgents = dummyAgents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === null || agent.approvalStatus === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-primary/10 text-primary'
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-700'
      case 'rejected':
        return 'bg-destructive/10 text-destructive'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">Travel Agents</h2>

        {/* Search and Filter */}
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-64 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-muted"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <Button
              variant={statusFilter === 'approved' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(statusFilter === 'approved' ? null : 'approved')}
            >
              Approved
            </Button>
            <Button
              variant={statusFilter === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(statusFilter === 'pending' ? null : 'pending')}
            >
              Pending
            </Button>
            <Button
              variant={statusFilter === 'rejected' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(statusFilter === 'rejected' ? null : 'rejected')}
            >
              Rejected
            </Button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-3">{filteredAgents.length} agents found</p>
      </div>

      {/* Agents Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredAgents.map((agent) => (
            <Card
              key={agent.id}
              className="p-4 hover:shadow-md transition-shadow cursor-pointer border-border"
              onClick={() => onAgentClick(agent.id)}
            >
              <div className="text-center">
                <img
                  src={agent.profileImage}
                  alt={agent.name}
                  className="w-16 h-16 rounded-full mx-auto mb-3 flex-shrink-0"
                />
                <h3 className="font-semibold text-foreground line-clamp-2">{agent.name}</h3>
                <p className="text-sm text-muted-foreground truncate mb-2">{agent.email}</p>

                <div className="mb-3">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(agent.approvalStatus)}`}>
                    {agent.approvalStatus.charAt(0).toUpperCase() + agent.approvalStatus.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-muted p-2 rounded">
                    <p className="text-muted-foreground">Packages</p>
                    <p className="font-bold text-primary">{agent.packages}</p>
                  </div>
                  <div className="bg-muted p-2 rounded">
                    <p className="text-muted-foreground">Rating</p>
                    <p className="font-bold text-primary">{agent.rating}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {filteredAgents.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No agents found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
