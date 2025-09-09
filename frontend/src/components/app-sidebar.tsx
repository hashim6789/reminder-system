import { Frame, History, PieChart } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavManagement } from "./nav-management";

const getSidebarData = () => {
  const user = {
    name: "User",
    email: "user@example.com",
    avatar: "/avatars/user.jpg",
  };

  const managements = [
    { name: "Tasks", url: "/tasks", icon: Frame },
    { name: "Reminder Rules", url: "/rules", icon: PieChart },
    { name: "Audit Logs", url: "/audit-logs", icon: History },
  ];

  return {
    user,

    managements: managements,
  };
};

export function AppSidebar() {
  const data = getSidebarData();

  return (
    <Sidebar collapsible="icon" className="w-64 bg-background border-r">
      <SidebarHeader className="p-4 border-b"></SidebarHeader>
      <SidebarContent>
        <NavManagement
          managements={data.managements.map((item) => ({
            ...item,
            url: item.url,
          }))}
        />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
