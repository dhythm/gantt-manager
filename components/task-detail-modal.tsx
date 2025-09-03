'use client'

import { Calendar, Clock, FileText, Link, MessageSquare, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'

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

interface TaskDetailModalProps {
  isOpen: boolean
  onClose: () => void
  task?: Task | null
  onSave: (taskData: any) => void
}

const teamMembers = [
  { id: '1', name: '田中太郎', avatar: '田' },
  { id: '2', name: '山田花子', avatar: '山' },
  { id: '3', name: '佐藤次郎', avatar: '佐' },
  { id: '4', name: '鈴木三郎', avatar: '鈴' },
]

const availableTasks = [
  { id: 'task1', name: '要件定義書作成' },
  { id: 'task2', name: '基本設計' },
  { id: 'task3', name: '詳細設計' },
  { id: 'task4', name: 'データベース設計' },
]

export function TaskDetailModal({ isOpen, onClose, task, onSave }: TaskDetailModalProps) {
  const [formData, setFormData] = useState({
    name: task?.name || '',
    description: task?.description || '',
    assignee: task?.assignee || '',
    progress: task?.progress || 0,
    startDate: task?.startDate || '',
    endDate: task?.endDate || '',
    estimatedHours: task?.estimatedHours || 0,
    actualHours: task?.actualHours || 0,
    priority: task?.priority || 'medium',
    status: task?.status || 'not-started',
    dependencies: task?.dependencies || [],
  })

  const [newComment, setNewComment] = useState('')

  // taskプロパティが変更された時にformDataを更新
  useEffect(() => {
    if (task) {
      setFormData({
        name: task.name || '',
        description: task.description || '',
        assignee: task.assignee || '',
        progress: task.progress || 0,
        startDate: task.startDate || '',
        endDate: task.endDate || '',
        estimatedHours: task.estimatedHours || 0,
        actualHours: task.actualHours || 0,
        priority: task.priority || 'medium',
        status: task.status || 'not-started',
        dependencies: task.dependencies || [],
      })
    } else {
      // taskがnullの場合はデフォルト値でリセット
      setFormData({
        name: '',
        description: '',
        assignee: '',
        progress: 0,
        startDate: '',
        endDate: '',
        estimatedHours: 0,
        actualHours: 0,
        priority: 'medium',
        status: 'not-started',
        dependencies: [],
      })
    }
  }, [task])

  const handleSave = () => {
    onSave(formData)
    onClose()
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      // コメント追加のロジック
      setNewComment('')
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return '高'
      case 'medium':
        return '中'
      case 'low':
        return '低'
      default:
        return '中'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'not-started':
        return '未着手'
      case 'in-progress':
        return '進行中'
      case 'completed':
        return '完了'
      default:
        return '未着手'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">タスク詳細</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左側: 基本情報 */}
          <div className="lg:col-span-2 space-y-6">
            {/* タスク名 */}
            <div className="space-y-2">
              <Label htmlFor="taskName" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                タスク名
              </Label>
              <Input
                id="taskName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="タスク名を入力してください"
              />
            </div>

            {/* 説明 */}
            <div className="space-y-2">
              <Label htmlFor="description">説明</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="タスクの詳細説明を入力してください"
                rows={4}
              />
            </div>

            {/* 日程 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  開始日
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">終了日</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>

            {/* 工数 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estimatedHours" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  予定工数（時間）
                </Label>
                <Input
                  id="estimatedHours"
                  type="number"
                  value={formData.estimatedHours}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      estimatedHours: Number.parseInt(e.target.value, 10) || 0,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="actualHours">実績工数（時間）</Label>
                <Input
                  id="actualHours"
                  type="number"
                  value={formData.actualHours}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      actualHours: Number.parseInt(e.target.value, 10) || 0,
                    })
                  }
                />
              </div>
            </div>

            {/* 進捗率 */}
            <div className="space-y-3">
              <Label>進捗率: {formData.progress}%</Label>
              <Slider
                value={[formData.progress]}
                onValueChange={(value) => setFormData({ ...formData, progress: value[0] })}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>

            {/* 先行タスク */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Link className="h-4 w-4" />
                先行タスク
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="先行タスクを選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {availableTasks.map((task) => (
                    <SelectItem key={task.id} value={task.id}>
                      {task.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.dependencies?.map((dep, index) => (
                  <Badge key={index} variant="secondary">
                    {availableTasks.find((t) => t.id === dep)?.name || dep}
                  </Badge>
                ))}
              </div>
            </div>

            {/* コメント欄 */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                コメント
              </Label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="コメントを入力してください"
                    rows={2}
                    className="flex-1"
                  />
                  <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                    追加
                  </Button>
                </div>

                {/* 既存のコメント */}
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {task?.comments?.map((comment) => (
                    <div key={comment.id} className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">{comment.author[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 右側: ステータス情報 */}
          <div className="space-y-6">
            {/* 担当者 */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <User className="h-4 w-4" />
                担当者
              </Label>
              <Select
                value={formData.assignee}
                onValueChange={(value) => setFormData({ ...formData, assignee: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="担当者を選択" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.name}>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
                        </Avatar>
                        {member.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 優先度 */}
            <div className="space-y-2">
              <Label>優先度</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: any) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">高</SelectItem>
                  <SelectItem value="medium">中</SelectItem>
                  <SelectItem value="low">低</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* ステータス */}
            <div className="space-y-2">
              <Label>ステータス</Label>
              <Select
                value={formData.status}
                onValueChange={(value: any) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not-started">未着手</SelectItem>
                  <SelectItem value="in-progress">進行中</SelectItem>
                  <SelectItem value="completed">完了</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* サマリー情報 */}
            <div className="p-4 bg-gray-50 rounded-lg space-y-3">
              <h4 className="font-medium">タスクサマリー</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>優先度:</span>
                  <Badge
                    variant={
                      formData.priority === 'high'
                        ? 'destructive'
                        : formData.priority === 'medium'
                          ? 'default'
                          : 'secondary'
                    }
                  >
                    {getPriorityLabel(formData.priority)}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>ステータス:</span>
                  <Badge variant={formData.status === 'completed' ? 'default' : 'secondary'}>
                    {getStatusLabel(formData.status)}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>進捗:</span>
                  <span>{formData.progress}%</span>
                </div>
                <div className="flex justify-between">
                  <span>予定工数:</span>
                  <span>{formData.estimatedHours}時間</span>
                </div>
                <div className="flex justify-between">
                  <span>実績工数:</span>
                  <span>{formData.actualHours}時間</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button onClick={handleSave}>保存</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
