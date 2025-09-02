import { Analytics } from '@vercel/analytics/next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import type React from 'react'
import { Suspense } from 'react'
import './globals.css'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
})

export const metadata: Metadata = {
  title: 'プロジェクト管理ツール',
  description: '日本語対応のプロジェクト管理ツール - WBS/ガントチャート機能付き',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${notoSansJP.variable}`}
      >
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
