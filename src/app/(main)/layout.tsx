import Sidebar from "@/components/SideBar";
import Footer from "../footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Sidebar/>
    {children}
    <Footer />
  </>
  )
}
