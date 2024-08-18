import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import React from "react";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kalendar",
  description: "Un compagnon roleplay pour Guild Wars 2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className={cn(inter.className, "h-full min-h-screen")}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
