"use client";
import { Menu } from "lucide-react";
import React from "react";

export default function CloseSidebar() {
  function hideSidebar() {
    document.getElementById("sidebar")?.classList.toggle("hidden");
    document.getElementById("content")?.classList.toggle("md:ml-80");
  }

  return (
    <button
      onClick={hideSidebar}
      className="z-50 fixed md:relative mt-[10px] w-10 h-10 flex justify-center items-center rounded-full  hover:bg-darkmode-800"
    >
      <Menu />
    </button>
  );
}
