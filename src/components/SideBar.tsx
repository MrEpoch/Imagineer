import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/Logo.png";
import { sidebar } from "@/lib/constant";
import SidebarLinks from "./SidebarLinks";
import UserButtonWithTheme from "./UserButtonWithTheme";

export function Sidebar({ className }: { className: string }) {
  return (
    <div id="sidebar" className={cn("pb-12", className)}>
      <div className="flex items-center gap-4 py-4 justify-between px-10">
        <Link
          href="/"
          className="flex items-center gap-3 justify-center font-bold"
        >
          <Image src={Logo} alt="Logo" width={50} height={50} />
          <span>Imagineer</span>
        </Link>
      </div>
      <div className="flex flex-col justify-between gap-6">
        <div className="space-y-4 pt-8 gap-4 px-8 flex flex-col">
          {sidebar.map((item) => (
            <SidebarLinks key={item.title} item={{ ...item, icon: null }}>
              {item.icon && <item.icon className="w-6 h-6" />}
            </SidebarLinks>
          ))}
        </div>
        <UserButtonWithTheme buttonClass="w-full flex justify-center items-center" />
      </div>
    </div>
  );
}
