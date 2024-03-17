import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/Logo.png";
import ControlButton from "@/components/ControlButton";
import UserButtonWithTheme from "./UserButtonWithTheme";
import SidebarLists from "./SidebarLists";

export default function Sidebar() {
  return (
    <main>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-darkmode-200 dark:bg-darkmode-800 dark:border-darkmode-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3 w-full">
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center justify-between w-full rtl:justify-end">
              <ControlButton />
              <Link href="/" className="flex ms-2 md:me-24">
                <Image
                  src={Logo}
                  alt="Logo"
                  width={50}
                  height={50}
                  className="mr-3"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Imagineer
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className="fixed flex flex-col justify-between top-0 left-0 z-40 w-64 flex min-h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-darkmode-200 sm:translate-x-0 dark:bg-darkmode-800 dark:border-darkmode-700"
        aria-label="Sidebar"
      >
        <div className="h-full  justify-between px-3 pb-4 overflow-y-auto bg-white dark:bg-darkmode-800">
          <ul className="space-y-2 font-medium">
            <SidebarLists />
          </ul>
        </div>
        <div className="h-full  justify-between px-3 pb-4 overflow-y-auto bg-white dark:bg-darkmode-800">
          <ul className="space-y-2 font-medium">
            <li>
              <UserButtonWithTheme
                buttonClass={
                  "flex items-center justify-center p-2 text-darkmode-900 rounded dark:text-white hover:bg-darkmode-100 dark:hover:bg-darkmode-700 group"
                }
              />
            </li>
          </ul>
        </div>
      </aside>
    </main>
  );
}
