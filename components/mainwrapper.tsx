'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export default function MainLayout({ children }: { children: ReactNode }) {


  return (
    <main className="flex-grow">
      {children}
    </main>
  )
}
