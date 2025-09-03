'use client'

import { AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react'
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

const progressData = [
  { name: '完了', value: 65, color: '#3b82f6' },
  { name: '未完了', value: 35, color: '#e5e7eb' },
]

const teamUtilizationData = [
  { name: '田中', utilization: 85, avatar: '田' },
  { name: '山田', utilization: 92, avatar: '山' },
  { name: '佐藤', utilization: 78, avatar: '佐' },
  { name: '鈴木', utilization: 88, avatar: '鈴' },
]

const upcomingTasks = [
  { id: 1, name: '要件定義書作成', assignee: '山田', dueDate: '1/20', status: '進行中' },
  { id: 2, name: '基本設計レビュー', assignee: '佐藤', dueDate: '1/22', status: '予定' },
  { id: 3, name: '詳細設計書作成', assignee: '鈴木', dueDate: '1/24', status: '予定' },
  { id: 4, name: 'UI設計', assignee: '田中', dueDate: '1/25', status: '予定' },
  { id: 5, name: 'データベース設計', assignee: '山田', dueDate: '1/26', status: '予定' },
]

const delayedTasks = [
  { id: 1, name: 'ヒアリング資料作成', assignee: '田中', delay: '3日' },
  { id: 2, name: '要件確認会議', assignee: '佐藤', delay: '1日' },
]

const burndownData = [
  { day: '1/15', ideal: 100, actual: 100 },
  { day: '1/16', ideal: 90, actual: 92 },
  { day: '1/17', ideal: 80, actual: 85 },
  { day: '1/18', ideal: 70, actual: 75 },
  { day: '1/19', ideal: 60, actual: 64 },
  { day: '1/20', ideal: 50, actual: 58 },
  { day: '1/21', ideal: 40, actual: 45 },
  { day: '1/22', ideal: 30, actual: 35 },
  { day: '1/23', ideal: 20, actual: 25 },
  { day: '1/24', ideal: 10, actual: 12 },
  { day: '1/25', ideal: 0, actual: 5 },
]

export function Dashboard() {
  return (
    <div className="p-6 space-y-6 custom-scrollbar">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">ダッシュボード</h2>
        <div className="text-sm text-muted-foreground">最終更新: 2025年1月15日 14:30</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* プロジェクト進捗カード */}
        <Card className="hover-lift transition-smooth">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              プロジェクト進捗
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-6">
              <div className="relative">
                <ResponsiveContainer width={120} height={120}>
                  <PieChart>
                    <Pie
                      data={progressData}
                      cx={60}
                      cy={60}
                      innerRadius={35}
                      outerRadius={55}
                      dataKey="value"
                      startAngle={90}
                      endAngle={450}
                    >
                      {progressData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">65%</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-sm">完了: 13タスク</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                  <span className="text-sm">残り: 7タスク</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-xs">順調に進行中</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 今週の完了予定タスクカード */}
        <Card className="hover-lift transition-smooth">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              今週の完了予定タスク
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar">
              {upcomingTasks.slice(0, 5).map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded px-2 transition-smooth cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="font-medium text-sm">{task.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Avatar className="h-4 w-4">
                        <AvatarFallback className="text-xs">{task.assignee[0]}</AvatarFallback>
                      </Avatar>
                      {task.assignee}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">{task.dueDate}</div>
                    <Badge
                      variant={task.status === '進行中' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {task.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 遅延タスクカード */}
        <Card className="hover-lift transition-smooth">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              遅延タスク
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-destructive">{delayedTasks.length}</div>
              <div className="text-sm text-muted-foreground">件の遅延</div>
            </div>
            <div className="space-y-2">
              {delayedTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-2 bg-red-50 rounded-md hover:bg-red-100 transition-smooth cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="font-medium text-sm text-destructive">{task.name}</div>
                    <div className="text-xs text-muted-foreground">{task.assignee}</div>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    {task.delay}遅延
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* チーム稼働率カード */}
        <Card className="hover-lift transition-smooth">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="h-5 w-5 bg-gradient-to-r from-blue-500 to-green-500 rounded"></div>
              チーム稼働率
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamUtilizationData.map((member) => (
                <div
                  key={member.name}
                  className="space-y-2 hover:bg-gray-50 p-2 rounded transition-smooth"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{member.name}</span>
                    </div>
                    <span className="text-sm font-bold">{member.utilization}%</span>
                  </div>
                  <Progress
                    value={member.utilization}
                    className="h-2 transition-smooth"
                    style={{
                      background:
                        member.utilization > 90
                          ? '#fee2e2'
                          : member.utilization > 80
                            ? '#fef3c7'
                            : '#dcfce7',
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">平均稼働率</span>
                <span className="font-bold">86%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* バーンダウンチャート */}
      <Card className="hover-lift transition-smooth">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-500" />
            バーンダウンチャート
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={burndownData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip formatter={(v: number) => `${v}%`} />
                <Line
                  type="monotone"
                  dataKey="ideal"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
