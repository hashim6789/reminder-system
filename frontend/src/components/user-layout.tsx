// "use client"

// import type React from "react"

// import { useEffect, useState } from "react"
// import { usePathname } from "next/navigation"
// import type { Role } from "@/types/user"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { IUser } from "@/types";
import { Navbar } from "./navbar";
import { AppSidebar } from "./app-sidebar";
import { Footer } from "./footer";

interface UserLayoutProps {
  children: React.ReactNode;
  user: IUser;
}

export function UserLayout({ children, user }: UserLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar user={user} />
        <div className="flex-1 flex">
          <AppSidebar />
          <SidebarInset className="flex flex-col">
            <main className="flex-1">{children}</main>
            <Footer />
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
