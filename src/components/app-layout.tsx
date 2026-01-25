'use client'

import { ThemeProvider } from './theme-provider'
import { Toaster } from './ui/sonner'
import React from 'react'
import { AppFooter } from '@/components/app-footer'
import AppHeader from './app-header'

export function AppLayout({
  children,
  links,
}: {
  children: React.ReactNode
  links: { label: string; path: string }[]
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="flex flex-col min-h-screen">
        <AppHeader />
        <main className="flex-grow container mx-auto p-4">
      
        
         
          {children}
        </main>
        <AppFooter />
      </div>
      <Toaster />
    </ThemeProvider>
  )
}
