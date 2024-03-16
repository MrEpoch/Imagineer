'use client';

import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import { useEffect, useState } from "react";

export default function UserButtonWithTheme({ buttonClass }: { buttonClass: string }) {
  const { theme } = useTheme();
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)");
      if (isDark.matches) {
        setDarkTheme(true);
      }
    }
  }, [])

  return (
    <div className={buttonClass}>
      <UserButton afterSignOutUrl="/" userProfileProps={{ appearance: { baseTheme: darkTheme ? dark : undefined } }} appearance={{ baseTheme: darkTheme ? dark : undefined }} />
    </div>
  )
}
