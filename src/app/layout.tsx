import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import SidebarProvider from "@/providers/SidebarProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Imagineer",
  description: "AI-powered image generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: "#0ea5e9" },
        elements: { card: "dark:bg-gradient" },
      }}
    >
      <html suppressHydrationWarning lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" enableSystem defaultTheme="system">
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
