'use client';
import { useSidebar } from '@/providers/SidebarProvider';
import Link from 'next/link';
import React from 'react'

interface SidebarLinksProps {
  item: {
    title: string;
    href: string;
    icon: any;
  };
  children?: React.ReactNode;
}

export default function SidebarLinks({ item, children }: SidebarLinksProps) {

  const { currentPage } = useSidebar() as any;

  const normalStyle = "transition gap-2 hover:text-white py-3 px-4 items-center flex rounded-full hover:bg-primary text-lg font-semibold tracking-tight";
  const activeStyle = "transition gap-2 text-white py-3 px-4 items-center flex rounded-full bg-primary text-lg font-semibold tracking-tight";

  return (
    <>
          <Link href={item.href} className={currentPage === item.href ? activeStyle : normalStyle}>
    {children}
            <span>
              {item.title}
</span>
</Link>
    </>
  )
}
