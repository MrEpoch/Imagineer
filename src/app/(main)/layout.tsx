import Sidebar from "@/components/SideBar";
import Footer from "../footer";
import LoadCurrentSidebar from "@/components/LoadCurrentSidebar";
import ErrorHandler from "@/components/ErrorComponent";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <LoadCurrentSidebar />
      <ErrorHandler />
      {children}
      <Footer />
    </>
  );
}
