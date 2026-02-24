import { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { dummyUsers } from '@/dummyData'

interface UsersListProps {
  onUserClick: (userId: string) => void
}

export function UsersList({ onUserClick }: UsersListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [verifiedFilter, setVerifiedFilter] = useState<boolean | null>(null)

  const filteredUsers = dummyUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesVerified = verifiedFilter === null || user.verified === verifiedFilter

    return matchesSearch && matchesVerified
  })

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">Users</h2>

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

          {/* Filter Button */}
          <div className="flex gap-2">
            <Button
              variant={verifiedFilter === true ? 'default' : 'outline'}
              size="sm"
              onClick={() => setVerifiedFilter(verifiedFilter === true ? null : true)}
            >
              Verified
            </Button>
            <Button
              variant={verifiedFilter === false ? 'default' : 'outline'}
              size="sm"
              onClick={() => setVerifiedFilter(verifiedFilter === false ? null : false)}
            >
              Unverified
            </Button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-3">{filteredUsers.length} users found</p>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-3">
          {filteredUsers.map((user) => (
            <Card
              key={user.id}
              className="p-4 hover:shadow-md transition-shadow cursor-pointer border-border"
              onClick={() => onUserClick(user.id)}
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{user.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.verified
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {user.verified ? 'Verified' : 'Unverified'}
                  </span>
                </div>
              </div>
            </Card>
          ))}

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No users found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
