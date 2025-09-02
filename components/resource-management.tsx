"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Calendar, Clock, AlertTriangle } from "lucide-react"

interface Member {
  id: string
  name: string
  avatar: string
  role: string
  email: string
  weeklyCapacity: number
  currentLoad: number
}

interface TaskAssignment {
  id: string
  taskName: string
  projectName: string
  startDate: string
  endDate: string
  estimatedHours: number
  priority: "high" | "medium" | "low"
  status: "not-started" | "in-progress" | "completed"
}

interface WeeklyLoad {
  week: string
  load: number
  status: "low" | "normal" | "high" | "overload"
}

const members: Member[] = [
  {
    id: "1",
    name: "田中太郎",
    avatar: "田",
    role: "プロジェクトマネージャー",
    email: "tanaka@company.com",
    weeklyCapacity: 40,
    currentLoad: 34,
  },
  {
    id: "2",
    name: "山田花子",
    avatar: "山",
    role: "システムエンジニア",
    email: "yamada@company.com",
    weeklyCapacity: 40,
    currentLoad: 37,
  },
  {
    id: "3",
    name: "佐藤次郎",
    avatar: "佐",
    role: "デザイナー",
    email: "sato@company.com",
    weeklyCapacity: 40,
    currentLoad: 31,
  },
  {
    id: "4",
    name: "鈴木三郎",
    avatar: "鈴",
    role: "開発者",
    email: "suzuki@company.com",
    weeklyCapacity: 40,
    currentLoad: 35,
  },
]

const taskAssignments: Record<string, TaskAssignment[]> = {
  "1": [
    {
      id: "t1",
      taskName: "プロジェクト計画策定",
      projectName: "新システム開発",
      startDate: "2025-01-15",
      endDate: "2025-01-20",
      estimatedHours: 16,
      priority: "high",
      status: "in-progress",
    },
    {
      id: "t2",
      taskName: "要件レビュー",
      projectName: "新システム開発",
      startDate: "2025-01-21",
      endDate: "2025-01-25",
      estimatedHours: 12,
      priority: "medium",
      status: "not-started",
    },
    {
      id: "t3",
      taskName: "進捗報告書作成",
      projectName: "新システム開発",
      startDate: "2025-01-26",
      endDate: "2025-01-30",
      estimatedHours: 6,
      priority: "low",
      status: "not-started",
    },
  ],
  "2": [
    {
      id: "t4",
      taskName: "データベース設計",
      projectName: "新システム開発",
      startDate: "2025-01-15",
      endDate: "2025-01-25",
      estimatedHours: 24,
      priority: "high",
      status: "in-progress",
    },
    {
      id: "t5",
      taskName: "API仕様書作成",
      projectName: "新システム開発",
      startDate: "2025-01-26",
      endDate: "2025-02-05",
      estimatedHours: 20,
      priority: "medium",
      status: "not-started",
    },
  ],
  "3": [
    {
      id: "t6",
      taskName: "UI/UXデザイン",
      projectName: "新システム開発",
      startDate: "2025-01-15",
      endDate: "2025-01-30",
      estimatedHours: 32,
      priority: "high",
      status: "in-progress",
    },
  ],
  "4": [
    {
      id: "t7",
      taskName: "フロントエンド実装",
      projectName: "新システム開発",
      startDate: "2025-02-01",
      endDate: "2025-02-20",
      estimatedHours: 40,
      priority: "high",
      status: "not-started",
    },
    {
      id: "t8",
      taskName: "単体テスト",
      projectName: "新システム開発",
      startDate: "2025-02-21",
      endDate: "2025-02-28",
      estimatedHours: 16,
      priority: "medium",
      status: "not-started",
    },
  ],
}

const weeklyLoads: Record<string, WeeklyLoad[]> = {
  "1": [
    { week: "第1週", load: 85, status: "normal" },
    { week: "第2週", load: 92, status: "high" },
    { week: "第3週", load: 78, status: "normal" },
    { week: "第4週", load: 88, status: "normal" },
  ],
  "2": [
    { week: "第1週", load: 95, status: "high" },
    { week: "第2週", load: 88, status: "normal" },
    { week: "第3週", load: 102, status: "overload" },
    { week: "第4週", load: 85, status: "normal" },
  ],
  "3": [
    { week: "第1週", load: 75, status: "normal" },
    { week: "第2週", load: 82, status: "normal" },
    { week: "第3週", load: 78, status: "normal" },
    { week: "第4週", load: 80, status: "normal" },
  ],
  "4": [
    { week: "第1週", load: 68, status: "low" },
    { week: "第2週", load: 90, status: "normal" },
    { week: "第3週", load: 95, status: "high" },
    { week: "第4週", load: 88, status: "normal" },
  ],
}

const getLoadColor = (status: string) => {
  switch (status) {
    case "low":
      return "bg-green-100 text-green-800"
    case "normal":
      return "bg-blue-100 text-blue-800"
    case "high":
      return "bg-yellow-100 text-yellow-800"
    case "overload":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800"
    case "medium":
      return "bg-yellow-100 text-yellow-800"
    case "low":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800"
    case "in-progress":
      return "bg-blue-100 text-blue-800"
    case "not-started":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function ResourceManagement() {
  const [selectedMember, setSelectedMember] = useState<string | null>(null)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">リソース管理</h2>
        <div className="text-sm text-muted-foreground">2025年1月 - チーム稼働状況</div>
      </div>

      <Tabs defaultValue="load-view" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="load-view" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            メンバー負荷ビュー
          </TabsTrigger>
          <TabsTrigger value="assignment-view" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            タスク割り当てビュー
          </TabsTrigger>
        </TabsList>

        {/* メンバー負荷ビュー */}
        <TabsContent value="load-view" className="space-y-4">
          <div className="grid gap-4">
            {members.map((member) => (
              <Card key={member.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{member.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        稼働率: {Math.round((member.currentLoad / member.weeklyCapacity) * 100)}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {member.currentLoad}h / {member.weeklyCapacity}h
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Progress value={(member.currentLoad / member.weeklyCapacity) * 100} className="h-2" />
                    <div className="grid grid-cols-4 gap-2">
                      {weeklyLoads[member.id]?.map((week) => (
                        <div key={week.week} className="text-center">
                          <div className="text-xs text-muted-foreground mb-1">{week.week}</div>
                          <Badge className={`text-xs ${getLoadColor(week.status)}`}>{week.load}%</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* タスク割り当てビュー */}
        <TabsContent value="assignment-view" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {members.map((member) => (
              <Card key={member.id} className="h-fit">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{member.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{member.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>
                      {member.currentLoad}h / {member.weeklyCapacity}h
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {taskAssignments[member.id]?.map((task) => (
                    <div key={task.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-move" draggable>
                      <div className="space-y-2">
                        <div className="font-medium text-sm">{task.taskName}</div>
                        <div className="text-xs text-muted-foreground">{task.projectName}</div>
                        <div className="flex items-center justify-between">
                          <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                            {task.priority === "high" ? "高" : task.priority === "medium" ? "中" : "低"}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(task.status)}`}>
                            {task.status === "completed" ? "完了" : task.status === "in-progress" ? "進行中" : "未着手"}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {task.startDate} - {task.endDate}
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Clock className="h-3 w-3" />
                          {task.estimatedHours}時間
                        </div>
                      </div>
                    </div>
                  ))}

                  {(!taskAssignments[member.id] || taskAssignments[member.id].length === 0) && (
                    <div className="text-center py-4 text-sm text-muted-foreground">割り当てタスクなし</div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-blue-800">
              <AlertTriangle className="h-4 w-4" />
              <span>タスクをドラッグ&ドロップして再割り当てできます</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
