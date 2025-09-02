'use client'

import { AlertTriangle, ChevronDown, ChevronRight, Plus } from 'lucide-react'
import { useState } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TaskDetailModal } from './task-detail-modal'

interface Task {
  id: string
  name: string
  assignee: string
  progress: number
  startDate: string
  endDate: string
  duration: number
  children?: Task[]
  expanded?: boolean
  level: number
  isOverdue?: boolean
  isMilestone?: boolean
}

const sampleTasks: Task[] = [
  {
    id: '1',
    name: '新システム開発',
    assignee: '田中',
    progress: 65,
    startDate: '2025-01-01',
    endDate: '2025-03-31',
    duration: 90,
    level: 0,
    expanded: true,
    children: [
      {
        id: '1.1',
        name: '要件定義フェーズ',
        assignee: '山田',
        progress: 100,
        startDate: '2025-01-01',
        endDate: '2025-01-20',
        duration: 20,
        level: 1,
        expanded: true,
        children: [
          {
            id: '1.1.1',
            name: 'ヒアリング',
            assignee: '田中',
            progress: 100,
            startDate: '2025-01-01',
            endDate: '2025-01-10',
            duration: 10,
            level: 2,
          },
          {
            id: '1.1.2',
            name: '要件定義書作成',
            assignee: '山田',
            progress: 100,
            startDate: '2025-01-11',
            endDate: '2025-01-20',
            duration: 10,
            level: 2,
          },
        ],
      },
      {
        id: '1.2',
        name: '設計フェーズ',
        assignee: '佐藤',
        progress: 60,
        startDate: '2025-01-21',
        endDate: '2025-02-20',
        duration: 30,
        level: 1,
        expanded: true,
        children: [
          {
            id: '1.2.1',
            name: '基本設計',
            assignee: '佐藤',
            progress: 80,
            startDate: '2025-01-21',
            endDate: '2025-02-05',
            duration: 15,
            level: 2,
          },
          {
            id: '1.2.2',
            name: '詳細設計',
            assignee: '鈴木',
            progress: 40,
            startDate: '2025-02-06',
            endDate: '2025-02-20',
            duration: 15,
            level: 2,
            isOverdue: true,
          },
        ],
      },
      {
        id: '1.3',
        name: '開発フェーズ',
        assignee: '田中',
        progress: 20,
        startDate: '2025-02-21',
        endDate: '2025-03-31',
        duration: 38,
        level: 1,
        expanded: true,
        children: [
          {
            id: '1.3.1',
            name: 'フロントエンド開発',
            assignee: '田中',
            progress: 30,
            startDate: '2025-02-21',
            endDate: '2025-03-15',
            duration: 22,
            level: 2,
          },
          {
            id: '1.3.2',
            name: 'バックエンド開発',
            assignee: '山田',
            progress: 15,
            startDate: '2025-02-21',
            endDate: '2025-03-20',
            duration: 27,
            level: 2,
          },
          {
            id: '1.3.3',
            name: 'テスト',
            assignee: '佐藤',
            progress: 0,
            startDate: '2025-03-21',
            endDate: '2025-03-31',
            duration: 10,
            level: 2,
          },
        ],
      },
    ],
  },
]

const timeScale = ['1月', '2月', '3月']
const weeks = Array.from({ length: 12 }, (_, i) => `第${i + 1}週`)

export function WBSGantt() {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks)
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('week')
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleTaskExpansion = (taskId: string) => {
    const updateTasks = (taskList: Task[]): Task[] => {
      return taskList.map((task) => {
        if (task.id === taskId) {
          return { ...task, expanded: !task.expanded }
        }
        if (task.children) {
          return { ...task, children: updateTasks(task.children) }
        }
        return task
      })
    }
    setTasks(updateTasks(tasks))
  }

  const flattenTasks = (taskList: Task[]): Task[] => {
    const result: Task[] = []
    const traverse = (tasks: Task[]) => {
      tasks.forEach((task) => {
        result.push(task)
        if (task.expanded && task.children) {
          traverse(task.children)
        }
      })
    }
    traverse(taskList)
    return result
  }

  const flatTasks = flattenTasks(tasks)

  const getTaskPosition = (startDate: string, duration: number) => {
    const start = new Date(startDate)
    const startOfYear = new Date('2025-01-01')
    const daysDiff = Math.floor((start.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24))
    const leftPercent = (daysDiff / 90) * 100
    const widthPercent = (duration / 90) * 100
    return { left: `${leftPercent}%`, width: `${widthPercent}%` }
  }

  const getTodayPosition = () => {
    const today = new Date()
    const startOfYear = new Date('2025-01-01')
    const daysDiff = Math.floor((today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24))
    return (daysDiff / 90) * 100
  }

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  const handleTaskSave = (taskData: any) => {
    // タスク更新のロジック
    console.log('Task saved:', taskData)
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* ヘッダー */}
      <div className="p-6 border-b bg-white">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">WBS/ガントチャート</h2>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('month')}
              className="transition-smooth"
            >
              月
            </Button>
            <Button
              variant={viewMode === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('week')}
              className="transition-smooth"
            >
              週
            </Button>
            <Button
              variant={viewMode === 'day' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('day')}
              className="transition-smooth"
            >
              日
            </Button>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左側: WBS構造 */}
        <div className="w-2/5 border-r bg-white overflow-y-auto custom-scrollbar">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">WBS構造</h3>
              <Button
                size="sm"
                variant="outline"
                className="hover-lift transition-smooth bg-transparent"
              >
                <Plus className="h-4 w-4 mr-1" />
                タスクを追加
              </Button>
            </div>

            <div className="space-y-1">
              {flatTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center py-2 px-2 hover:bg-gray-50 rounded-md group cursor-pointer transition-smooth focus-ring"
                  style={{ paddingLeft: `${task.level * 20 + 8}px` }}
                  onClick={() => handleTaskClick(task)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleTaskClick(task)
                    }
                  }}
                >
                  <div className="flex items-center flex-1 min-w-0">
                    {task.children && task.children.length > 0 ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 mr-2 transition-smooth"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleTaskExpansion(task.id)
                        }}
                      >
                        {task.expanded ? (
                          <ChevronDown className="h-3 w-3" />
                        ) : (
                          <ChevronRight className="h-3 w-3" />
                        )}
                      </Button>
                    ) : (
                      <div className="w-6 mr-2" />
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm truncate">{task.name}</span>
                        {task.isOverdue && (
                          <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0 animate-pulse" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-xs">{task.assignee[0]}</AvatarFallback>
                        </Avatar>
                        <Badge variant="secondary" className="text-xs">
                          {task.progress}%
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {task.startDate.slice(5)} - {task.endDate.slice(5)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右側: ガントチャート */}
        <div className="w-3/5 bg-gray-50 overflow-auto custom-scrollbar">
          <div className="min-w-[800px]">
            {/* タイムライン ヘッダー */}
            <div className="bg-white border-b sticky top-0 z-10">
              <div className="h-12 flex items-center px-4 border-b">
                <div className="flex-1 flex">
                  {timeScale.map((month, _index) => (
                    <div
                      key={month}
                      className="flex-1 text-center text-sm font-medium border-r last:border-r-0"
                    >
                      {month}
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-8 flex items-center px-4">
                <div className="flex-1 flex">
                  {weeks.map((week, _index) => (
                    <div
                      key={week}
                      className="flex-1 text-center text-xs text-muted-foreground border-r last:border-r-0"
                    >
                      {week}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ガントバー */}
            <div className="relative">
              {/* 今日の線 */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20 shadow-sm"
                style={{ left: `${getTodayPosition()}%` }}
              />

              {flatTasks.map((task, _index) => {
                const position = getTaskPosition(task.startDate, task.duration)
                return (
                  <div
                    key={task.id}
                    className="h-12 flex items-center px-4 border-b border-gray-100 relative hover:bg-gray-50 transition-smooth"
                  >
                    <div className="flex-1 relative">
                      {/* ガントバー */}
                      <div
                        className="absolute h-6 rounded-md flex items-center px-2 text-xs text-white font-medium shadow-sm cursor-pointer hover:shadow-md transition-smooth focus-ring"
                        style={{
                          ...position,
                          backgroundColor: task.progress === 100 ? '#3b82f6' : '#94a3b8',
                          background: `linear-gradient(to right, #3b82f6 ${task.progress}%, #e2e8f0 ${task.progress}%)`,
                        }}
                        onClick={() => handleTaskClick(task)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleTaskClick(task)
                          }
                        }}
                      >
                        <span className="truncate text-black mix-blend-difference">
                          {task.name}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* TaskDetailModal */}
      <TaskDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
        onSave={handleTaskSave}
      />
    </div>
  )
}
