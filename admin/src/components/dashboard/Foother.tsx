export function Footer() {
  return (
    <footer className="bg-sidebar border-t border-sidebar-border py-6 px-6 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
        <div className="text-center md:text-left">
          <p className="text-sidebar-foreground font-semibold">Travel Agency Admin Dashboard</p>
          <p className="text-sidebar-foreground/60 text-sm">Manage your travel business efficiently</p>
        </div>
        <div className="text-center md:text-right text-sm text-sidebar-foreground/60">
          <p>&copy; {new Date().getFullYear()} Travel Admin. All rights reserved.</p>
          <p className="text-xs mt-1">Version 1.0.0</p>
        </div>
      </div>
    </footer>
  )
}
