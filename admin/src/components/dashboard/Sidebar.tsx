'use client'

import { useState } from 'react'
import { Users, Users2, Package, UserCheck, CreditCard, MessageSquare, BarChart3, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  isOpen?: boolean
  onClose?: () => void
}

const sections = [
  { id: 'users', label: 'Users', icon: Users, count: 1250 },
  { id: 'agents', label: 'Agents', icon: Users2, count: 85 },
  { id: 'packages', label: 'Packages', icon: Package, count: 342 },
  { id: 'subadmins', label: 'Sub Admins', icon: UserCheck, count: 12 },
  { id: 'payments', label: 'Payments', icon: CreditCard, count: 567 },
  { id: 'reviews', label: 'Reviews', icon: MessageSquare, count: 834 },
  { id: 'statistics', label: 'Statistics', icon: BarChart3, count: 0 },
]

export function Sidebar({ activeSection, onSectionChange, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:relative left-0 top-16 lg:top-0 h-[calc(100vh-4rem)] lg:h-screen w-72 bg-sidebar border-r border-sidebar-border overflow-y-auto transition-transform duration-300 z-20 lg:z-0',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="p-6 space-y-4">
          {/* Close button for mobile */}
          {isOpen && (
            <button onClick={onClose} className="absolute top-4 right-4 lg:hidden p-1 hover:bg-sidebar-accent rounded">
              <X className="w-5 h-5 text-sidebar-foreground" />
            </button>
          )}

          <h2 className="text-lg font-bold text-sidebar-foreground mb-6">Management</h2>

          <div className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon
              const isActive = activeSection === section.id

              return (
                <button
                  key={section.id}
                  onClick={() => {
                    onSectionChange(section.id)
                    onClose?.()
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group',
                    isActive
                      ? 'bg-gradient-to-r from-sidebar-primary to-accent text-sidebar-primary-foreground shadow-md'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent'
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-sm">{section.label}</p>
                    {section.count > 0 && (
                      <p
                        className={cn(
                          'text-xs',
                          isActive ? 'text-sidebar-primary-foreground/70' : 'text-sidebar-foreground/60'
                        )}
                      >
                        {section.count.toLocaleString()}
                      </p>
                    )}
                  </div>
                  {section.count > 0 && (
                    <span
                      className={cn(
                        'text-xs font-semibold px-2 py-1 rounded',
                        isActive
                          ? 'bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {section.count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </aside>
    </>
  )
}
