"use client";

import { SignIn } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import { useEffect, useState } from "react";

export default function ThemeSignIn() {
  const { theme } = useTheme();
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)");
      if (isDark.matches) {
        setDarkTheme(true);
      }
    }
  }, []);

  return (
    <>
      <SignIn appearance={{ baseTheme: darkTheme ? dark : undefined }} />
    </>
  );
}
