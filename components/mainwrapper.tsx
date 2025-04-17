'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <main className={`flex-grow relative z-0 ${!isHome ? 'pt-16' : ''}`}>
      {children}
    </main>
  )
}
