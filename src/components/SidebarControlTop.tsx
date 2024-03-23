import React from 'react'
import CloseSidebar from './CloseSidebar';

export default function SidebarControlTop() {
  return (
    <nav className="w-full flex justify-end py-4 px-8 border-zinc-100 dark:border-secondary border-b">
      <CloseSidebar />
    </nav>
  )
}
