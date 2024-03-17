'use client';

import { useSidebar } from "@/providers/SidebarProvider";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function LoadCurrentSidebar() {
  const pathname = usePathname();
  const { setCurrentPageHandler } = useSidebar() as any;

  useEffect(() => {
    setCurrentPageHandler(pathname);
    console.log(pathname);
  }, [pathname])

  return <></>
}
