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
  description?: string
  assignee: string
  progress: number
  startDate: string
  endDate: string
  duration: number
  estimatedHours: number
  actualHours: number
  priority: 'high' | 'medium' | 'low'
  status: 'not-started' | 'in-progress' | 'completed'
  dependencies?: string[]
  children?: Task[]
  expanded?: boolean
  level: number
  isOverdue?: boolean
  isMilestone?: boolean
  comments?: Array<{
    id: string
    author: string
    content: string
    timestamp: string
  }>
}

const sampleTasks: Task[] = [
  {
    id: '1',
    name: '新システム開発',
    description: 'ECサイト構築のための新システム開発プロジェクト',
    assignee: '田中',
    progress: 65,
    startDate: '2025-01-01',
    endDate: '2025-03-31',
    duration: 90,
    estimatedHours: 720,
    actualHours: 468,
    priority: 'high',
    status: 'in-progress',
    dependencies: [],
    level: 0,
    expanded: true,
    comments: [
      {
        id: '1',
        author: '田中',
        content: 'プロジェクト全体の進捗は順調です。',
        timestamp: '2025-01-15 10:00',
      },
    ],
    children: [
      {
        id: '1.1',
        name: '要件定義フェーズ',
        description: 'システムの要件を定義し、機能仕様を明確にする',
        assignee: '山田',
        progress: 100,
        startDate: '2025-01-01',
        endDate: '2025-01-20',
        duration: 20,
        estimatedHours: 160,
        actualHours: 150,
        priority: 'high',
        status: 'completed',
        dependencies: [],
        level: 1,
        expanded: true,
        comments: [
          {
            id: '2',
            author: '山田',
            content: '要件定義が完了しました。',
            timestamp: '2025-01-20 15:30',
          },
        ],
        children: [
          {
            id: '1.1.1',
            name: 'ヒアリング',
            description: 'ステークホルダーからの要望聞き取り',
            assignee: '田中',
            progress: 100,
            startDate: '2025-01-01',
            endDate: '2025-01-10',
            duration: 10,
            estimatedHours: 80,
            actualHours: 75,
            priority: 'high',
            status: 'completed',
            dependencies: [],
            level: 2,
            comments: [],
          },
          {
            id: '1.1.2',
            name: '要件定義書作成',
            description: 'ヒアリング結果をもとに要件定義書を作成',
            assignee: '山田',
            progress: 100,
            startDate: '2025-01-11',
            endDate: '2025-01-20',
            duration: 10,
            estimatedHours: 80,
            actualHours: 75,
            priority: 'medium',
            status: 'completed',
            dependencies: ['1.1.1'],
            level: 2,
            comments: [],
          },
        ],
      },
      {
        id: '1.2',
        name: '設計フェーズ',
        description: 'システムアーキテクチャと詳細設計の作成',
        assignee: '佐藤',
        progress: 60,
        startDate: '2025-01-21',
        endDate: '2025-02-20',
        duration: 30,
        estimatedHours: 240,
        actualHours: 144,
        priority: 'high',
        status: 'in-progress',
        dependencies: ['1.1'],
        level: 1,
        expanded: true,
        comments: [],
        children: [
          {
            id: '1.2.1',
            name: '基本設計',
            description: 'システム全体の基本的な設計を行う',
            assignee: '佐藤',
            progress: 80,
            startDate: '2025-01-21',
            endDate: '2025-02-05',
            duration: 15,
            estimatedHours: 120,
            actualHours: 96,
            priority: 'high',
            status: 'in-progress',
            dependencies: [],
            level: 2,
            comments: [],
          },
          {
            id: '1.2.2',
            name: '詳細設計',
            description: '各機能の詳細な設計書を作成する',
            assignee: '鈴木',
            progress: 40,
            startDate: '2025-02-06',
            endDate: '2025-02-20',
            duration: 15,
            estimatedHours: 120,
            actualHours: 48,
            priority: 'medium',
            status: 'in-progress',
            dependencies: ['1.2.1'],
            level: 2,
            isOverdue: true,
            comments: [
              {
                id: '3',
                author: '鈴木',
                content: '詳細設計でいくつか課題が見つかりました。',
                timestamp: '2025-02-10 14:20',
              },
            ],
          },
        ],
      },
      {
        id: '1.3',
        name: '開発フェーズ',
        description: 'フロントエンドとバックエンドの開発、テスト実施',
        assignee: '田中',
        progress: 20,
        startDate: '2025-02-21',
        endDate: '2025-03-31',
        duration: 38,
        estimatedHours: 320,
        actualHours: 64,
        priority: 'medium',
        status: 'not-started',
        dependencies: ['1.2'],
        level: 1,
        expanded: true,
        comments: [],
        children: [
          {
            id: '1.3.1',
            name: 'フロントエンド開発',
            description: 'React.jsを使用したユーザーインターフェースの開発',
            assignee: '田中',
            progress: 30,
            startDate: '2025-02-21',
            endDate: '2025-03-15',
            duration: 22,
            estimatedHours: 176,
            actualHours: 53,
            priority: 'medium',
            status: 'not-started',
            dependencies: [],
            level: 2,
            comments: [],
          },
          {
            id: '1.3.2',
            name: 'バックエンド開発',
            description: 'Node.jsとExpressを使用したAPI開発',
            assignee: '山田',
            progress: 15,
            startDate: '2025-02-21',
            endDate: '2025-03-20',
            duration: 27,
            estimatedHours: 216,
            actualHours: 32,
            priority: 'medium',
            status: 'not-started',
            dependencies: [],
            level: 2,
            comments: [],
          },
          {
            id: '1.3.3',
            name: 'テスト',
            description: '単体テスト、結合テスト、システムテストの実施',
            assignee: '佐藤',
            progress: 0,
            startDate: '2025-03-21',
            endDate: '2025-03-31',
            duration: 10,
            estimatedHours: 80,
            actualHours: 0,
            priority: 'low',
            status: 'not-started',
            dependencies: ['1.3.1', '1.3.2'],
            level: 2,
            comments: [],
          },
        ],
      },
    ],
  },
]

const timeScale = ['1月', '2月', '3月']
const weeks = Array.from({ length: 12 }, (_, i) => `第${i + 1}週`)

// 文字列の%を数値化
const parsePercent = (v: string) => Number.parseFloat(v.replace('%', '')) || 0

// タスクのツリーを深く更新
function updateTaskById(tasks: Task[], id: string, updater: (t: Task) => Task): Task[] {
  return tasks.map((t) => {
    if (t.id === id) return updater(t)
    if (t.children) return { ...t, children: updateTaskById(t.children, id, updater) }
    return t
  })
}

// 親タスクの進捗ロールアップ（加重平均: estimatedHours -> duration -> 件数）
function rollupProgress(task: Task): Task {
  if (!task.children || task.children.length === 0) return task
  const children = task.children.map(rollupProgress)
  const hasEstimated = children.some((c) => (c.estimatedHours ?? 0) > 0)
  const hasDuration = children.some((c) => (c.duration ?? 0) > 0)

  let totalWeight = 0
  let acc = 0
  for (const c of children) {
    const w = hasEstimated ? c.estimatedHours || 0 : hasDuration ? c.duration || 0 : 1
    totalWeight += w
    acc += (c.progress || 0) * w
  }
  const progress = totalWeight > 0 ? Math.round((acc / totalWeight) * 100) / 100 : 0
  return { ...task, children, progress }
}

// 期限超過を自動判定
function markOverdue(task: Task, today: Date): Task {
  const isDone = task.progress >= 100
  const end = task.endDate ? new Date(task.endDate) : null
  const startOfToday = new Date(today.toDateString()).getTime()
  const overdue = !!(end && !isDone && end.getTime() < startOfToday)
  const children = task.children?.map((c) => markOverdue(c, today))
  return { ...task, isOverdue: overdue, ...(children ? { children } : {}) }
}

// ツリー全体の再計算（ロールアップ→期限超過）
function recalc(tasks: Task[]): Task[] {
  const rolled = tasks.map(rollupProgress)
  const today = new Date()
  return rolled.map((t) => markOverdue(t, today))
}

export function WBSGantt() {
  const [tasks, setTasks] = useState<Task[]>(() => recalc(sampleTasks))
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

  const getTaskPositionPercent = (startDate: string, duration: number) => {
    const pos = getTaskPosition(startDate, duration)
    return { left: parsePercent(pos.left), width: parsePercent(pos.width) }
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
    if (!selectedTask) return
    const updated = updateTaskById(tasks, selectedTask.id, (t) => ({
      ...t,
      name: taskData.name ?? t.name,
      description: taskData.description ?? t.description,
      assignee: taskData.assignee ?? t.assignee,
      progress: typeof taskData.progress === 'number' ? taskData.progress : t.progress,
      startDate: taskData.startDate || t.startDate,
      endDate: taskData.endDate || t.endDate,
      estimatedHours:
        typeof taskData.estimatedHours === 'number' ? taskData.estimatedHours : t.estimatedHours,
      actualHours: typeof taskData.actualHours === 'number' ? taskData.actualHours : t.actualHours,
      priority: taskData.priority || t.priority,
      status: taskData.status || t.status,
      dependencies: taskData.dependencies || t.dependencies,
    }))
    setTasks(recalc(updated))
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
                      {/* マイルストーン or ガントバー */}
                      {task.isMilestone ? (
                        <div
                          className="absolute h-3 w-3 rotate-45 bg-blue-500 shadow-sm cursor-pointer hover:shadow-md transition-smooth focus-ring"
                          style={{
                            left: position.left,
                            width: '12px',
                            transform: 'translateX(-50%) rotate(45deg)',
                          }}
                          role="button"
                          tabIndex={0}
                          onClick={() => handleTaskClick(task)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') handleTaskClick(task)
                          }}
                          aria-label={`${task.name} マイルストーン`}
                        />
                      ) : (
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
                      )}
                    </div>
                  </div>
                )
              })}

              {/* 依存関係の矢印（簡易） */}
              {(() => {
                const ROW_HEIGHT = 48
                const height = flatTasks.length * ROW_HEIGHT
                return (
                  <svg
                    className="absolute inset-0 pointer-events-none"
                    width="100%"
                    height={height}
                    viewBox={`0 0 100 ${height}`}
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <marker
                        id="arrow"
                        markerWidth="6"
                        markerHeight="6"
                        refX="6"
                        refY="3"
                        orient="auto"
                      >
                        <path d="M0,0 L6,3 L0,6 z" fill="#94a3b8" />
                      </marker>
                    </defs>
                    {flatTasks.flatMap((task, idx) => {
                      if (!task.dependencies || task.dependencies.length === 0) return []
                      return task.dependencies
                        .map((depId) => {
                          const fromIdx = flatTasks.findIndex((t) => t.id === depId)
                          if (fromIdx === -1) return null
                          const fromTask = flatTasks[fromIdx]
                          const from = getTaskPositionPercent(fromTask.startDate, fromTask.duration)
                          const to = getTaskPositionPercent(task.startDate, task.duration)
                          const x1 = from.left + from.width
                          const x2 = to.left
                          const y1 = fromIdx * ROW_HEIGHT + ROW_HEIGHT / 2
                          const y2 = idx * ROW_HEIGHT + ROW_HEIGHT / 2
                          const midX = (x1 + x2) / 2
                          const d = `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`
                          return (
                            <path
                              key={`${task.id}-${depId}`}
                              d={d}
                              fill="none"
                              stroke="#94a3b8"
                              strokeWidth="1.5"
                              markerEnd="url(#arrow)"
                            />
                          )
                        })
                        .filter(Boolean) as JSX.Element[]
                    })}
                  </svg>
                )
              })()}
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
