'use client'

import { useState } from 'react'
import { Dashboard } from '@/components/dashboard'
import { Header } from '@/components/header'
import { ResourceManagement } from '@/components/resource-management'
import { Sidebar } from '@/components/sidebar'
import { WBSGantt } from '@/components/wbs-gantt'

export default function ProjectManagementTool() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const renderMainContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />
      case 'wbs-gantt':
        return <WBSGantt />
      case 'resources':
        return <ResourceManagement />
      case 'reports':
        return <div className="p-6">レポート機能（開発予定）</div>
      case 'settings':
        return <div className="p-6">設定画面（開発予定）</div>
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main
          className={`flex-1 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}
        >
          {renderMainContent()}
        </main>
      </div>
    </div>
  )
}
