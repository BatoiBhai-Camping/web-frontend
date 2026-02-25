import { useState } from "react";
import {
  Users,
  Users2,
  Package,
  BookOpen,
  CreditCard,
  BarChart3,
  X,
  ShieldOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import type { userType } from "@/types/userType";
import type { RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const sections = [
  { id: "users", label: "Users", icon: Users },
  { id: "agents", label: "Agents", icon: Users2 },
  { id: "packages", label: "Packages", icon: Package },
  { id: "bookings", label: "Bookings", icon: BookOpen },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "statistics", label: "Statistics", icon: BarChart3 },
];
export function Sidebar({
  activeSection,
  onSectionChange,
  isOpen,
  onClose,
}: SidebarProps) {
  const user: userType = useSelector((state: RootState) => state.auth.user);
  const navigate  = useNavigate()
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:relative left-0 top-16 lg:top-0 h-[calc(100vh-4rem)] lg:h-screen w-72 bg-sidebar border-r border-sidebar-border overflow-y-auto transition-transform duration-300 z-20 lg:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="p-6 space-y-4">
          {/* Close button for mobile */}
          {isOpen && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 lg:hidden p-1 hover:bg-sidebar-accent rounded"
            >
              <X className="w-5 h-5 text-sidebar-foreground" />
            </button>
          )}

          <h2 className="text-lg font-bold text-sidebar-foreground mb-6">
            Management
          </h2>

          <div className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  onClick={() => {
                    onSectionChange(section.id);
                    onClose?.();
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group",
                    isActive
                      ? "bg-gradient-to-r from-sidebar-primary to-accent text-sidebar-primary-foreground shadow-md"
                      : "text-sidebar-foreground hover:bg-sidebar-accent",
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-sm">{section.label}</p>
                  </div>
                </button>
              );
            })}
            {user.role == "ROOTADMIN" ? (
              <button
                key="admin"
                onClick={() => {
                  navigate("/sub-admins")
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <ShieldOff className="w-5 h-5 flex-shrink-0" />
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm">Admin</p>
                </div>
              </button>
            ) : null}
          </div>
        </div>
      </aside>
    </>
  );
}
