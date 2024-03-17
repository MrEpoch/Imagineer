"use client";
import { createContext, useContext, useEffect, useState } from "react";

// this is fucking context, it needs fucking event dispatcher type and string no fucking void!!!!!
const MySidebarContext = createContext({
  currentPage: "/",
  setCurrentPageHandler: (page: string) => {},
});

export const useSidebar = () => {
  const context = useContext(MySidebarContext);
  if (context === undefined || context === null) {
    return {};
  }
  return context;
};

export default function MySidbarContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentPage, setCurrentPage] = useState("/");

  function setCurrentPageHandler(page: string) {
    setCurrentPage(page);
  }

  return (
    <MySidebarContext.Provider value={{ currentPage, setCurrentPageHandler }}>
    
      {children}
    </MySidebarContext.Provider>
  );
}

