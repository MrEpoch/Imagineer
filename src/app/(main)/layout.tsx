import { Sidebar } from "@/components/SideBar";
import Footer from "../footer";
import ErrorHandler from "@/components/ErrorComponent";
import SidebarControlTop from "@/components/SidebarControlTop";
import LoadCurrentSidebar from "@/components/LoadCurrentSidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen h-full dark:text-white text-black dark:bg-background w-full flex flex-col">
      <ErrorHandler />
      <LoadCurrentSidebar />
      <Sidebar className="dark:bg-background border-r border-zinc-100 w-full md:w-80 dark:border-border fixed min-h-screen dark:text-white text-gray-700" />
      <div id="content" className="md:ml-80">
        <SidebarControlTop />
        {children}
        <Footer />
      </div>
    </main>
  );
}
