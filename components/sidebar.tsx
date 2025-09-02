"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Calendar, Users, FileText, Settings, ChevronLeft, ChevronRight } from "lucide-react"

interface SidebarProps {
  currentView: string
  onViewChange: (view: string) => void
  collapsed: boolean
  onToggleCollapse: () => void
}

const menuItems = [
  { id: "dashboard", label: "ダッシュボード", icon: LayoutDashboard },
  { id: "wbs-gantt", label: "WBS/ガントチャート", icon: Calendar },
  { id: "resources", label: "リソース管理", icon: Users },
  { id: "reports", label: "レポート", icon: FileText },
  { id: "settings", label: "設定", icon: Settings },
]

export function Sidebar({ currentView, onViewChange, collapsed, onToggleCollapse }: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-sidebar border-r border-sidebar-border transition-all duration-300 z-10",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-end p-2">
          <Button variant="ghost" size="icon" onClick={onToggleCollapse} className="h-8 w-8">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="flex-1 px-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={currentView === item.id ? "secondary" : "ghost"}
                className={cn("w-full justify-start", collapsed && "px-2")}
                onClick={() => onViewChange(item.id)}
              >
                <Icon className="h-4 w-4" />
                {!collapsed && <span className="ml-2">{item.label}</span>}
              </Button>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
