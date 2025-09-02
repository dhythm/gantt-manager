import { Settings } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-primary">プロジェクト管理ツール</h1>
        <div className="text-sm text-muted-foreground">プロジェクト: 新システム開発</div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/japanese-user-avatar.png" />
            <AvatarFallback>田中</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">田中太郎</span>
        </div>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
