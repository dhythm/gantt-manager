import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ProjectManagementTool from './page'

// コンポーネントのモック
vi.mock('@/components/header', () => ({
  Header: () => <div data-testid="header">Header</div>,
}))

vi.mock('@/components/sidebar', () => ({
  Sidebar: ({ currentView, onViewChange, collapsed, onToggleCollapse }: {
    currentView: string
    onViewChange: (view: string) => void
    collapsed: boolean
    onToggleCollapse: () => void
  }) => (
    <div data-testid="sidebar">
      <div>Current View: {currentView}</div>
      <button type="button" onClick={() => onViewChange('wbs-gantt')}>WBS-Gantt</button>
      <button type="button" onClick={() => onViewChange('resources')}>Resources</button>
      <button type="button" onClick={() => onViewChange('reports')}>Reports</button>
      <button type="button" onClick={() => onViewChange('settings')}>Settings</button>
      <button type="button" onClick={onToggleCollapse}>Toggle Collapse</button>
      <div>{collapsed ? 'Collapsed' : 'Expanded'}</div>
    </div>
  ),
}))

vi.mock('@/components/dashboard', () => ({
  Dashboard: () => <div data-testid="dashboard">Dashboard</div>,
}))

vi.mock('@/components/wbs-gantt', () => ({
  WBSGantt: () => <div data-testid="wbs-gantt">WBS-Gantt</div>,
}))

vi.mock('@/components/resource-management', () => ({
  ResourceManagement: () => <div data-testid="resource-management">Resource Management</div>,
}))

describe('ProjectManagementTool', () => {
  it('renders the default dashboard view', () => {
    render(<ProjectManagementTool />)

    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('dashboard')).toBeInTheDocument()
    expect(screen.getByText('Current View: dashboard')).toBeInTheDocument()
  })

  it('switches to WBS-Gantt view when clicked', () => {
    render(<ProjectManagementTool />)

    const wbsButton = screen.getByText('WBS-Gantt')
    fireEvent.click(wbsButton)

    expect(screen.getByTestId('wbs-gantt')).toBeInTheDocument()
    expect(screen.getByText('Current View: wbs-gantt')).toBeInTheDocument()
  })

  it('switches to Resources view when clicked', () => {
    render(<ProjectManagementTool />)

    const resourcesButton = screen.getByText('Resources')
    fireEvent.click(resourcesButton)

    expect(screen.getByTestId('resource-management')).toBeInTheDocument()
    expect(screen.getByText('Current View: resources')).toBeInTheDocument()
  })

  it('shows reports placeholder when Reports is clicked', () => {
    render(<ProjectManagementTool />)

    const reportsButton = screen.getByText('Reports')
    fireEvent.click(reportsButton)

    expect(screen.getByText('レポート機能（開発予定）')).toBeInTheDocument()
    expect(screen.getByText('Current View: reports')).toBeInTheDocument()
  })

  it('shows settings placeholder when Settings is clicked', () => {
    render(<ProjectManagementTool />)

    const settingsButton = screen.getByText('Settings')
    fireEvent.click(settingsButton)

    expect(screen.getByText('設定画面（開発予定）')).toBeInTheDocument()
    expect(screen.getByText('Current View: settings')).toBeInTheDocument()
  })

  it('toggles sidebar collapse state', () => {
    render(<ProjectManagementTool />)

    expect(screen.getByText('Expanded')).toBeInTheDocument()

    const toggleButton = screen.getByText('Toggle Collapse')
    fireEvent.click(toggleButton)

    expect(screen.getByText('Collapsed')).toBeInTheDocument()

    fireEvent.click(toggleButton)

    expect(screen.getByText('Expanded')).toBeInTheDocument()
  })
})
