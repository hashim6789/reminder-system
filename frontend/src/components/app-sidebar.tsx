import {
  // AudioWaveform,
  // BookOpen,
  // Bot,
  // Command,
  Frame,
  History,
  PieChart,
  // GalleryVerticalEnd,
  // Map,
  // PieChart,
  // Settings2,
  // SquareTerminal,
} from "lucide-react";
// import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
// import { NavUser } from "@/components/nav-user";
// import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Role } from "@/types";
import { NavManagement } from "./nav-management";

const getSidebarData = (userRole: Role) => {
  const user = {
    name: "User",
    email: "user@example.com",
    avatar: "/avatars/user.jpg",
  };

  // const teams = [
  //   { name: "Acme Inc", logo: GalleryVerticalEnd, plan: "Enterprise" },
  //   { name: "Acme Corp.", logo: AudioWaveform, plan: "Startup" },
  //   { name: "Evil Corp.", logo: Command, plan: "Free" },
  // ];

  // const commonNavMain = [
  //   {
  //     title: "Playground",
  //     url: "/playground",
  //     icon: SquareTerminal,
  //     isActive: true,
  //     items: [
  //       { title: "History", url: "/playground/history" },
  //       { title: "Starred", url: "/playground/starred" },
  //     ],
  //   },
  //   {
  //     title: "Documentation",
  //     url: "/docs",
  //     icon: BookOpen,
  //     items: [
  //       { title: "Introduction", url: "/docs/intro" },
  //       { title: "Get Started", url: "/docs/start" },
  //     ],
  //   },
  // ];

  // const adminNavMain = [
  //   {
  //     title: "Models",
  //     url: "/models",
  //     icon: Bot,
  //     items: [
  //       { title: "Genesis", url: "/models/genesis" },
  //       { title: "Explorer", url: "/models/explorer" },
  //       { title: "Quantum", url: "/models/quantum" },
  //     ],
  //   },
  //   {
  //     title: "Settings",
  //     url: "/settings",
  //     icon: Settings2,
  //     items: [
  //       { title: "General", url: "/settings/general" },
  //       { title: "Team", url: "/settings/team" },
  //       { title: "Billing", url: "/settings/billing" },
  //       { title: "Limits", url: "/settings/limits" },
  //     ],
  //   },
  // ];

  const managements = [
    { name: "Tasks", url: "/user/tasks", icon: Frame },
    { name: "Reminder Rules", url: "/user/rules", icon: PieChart },
    // { name: "Audit Logs", url: "/user/audit-logs", icon: History },
  ];

  // const adminProjects = [
  //   { name: "Admin Dashboard", url: "/admin/dashboard", icon: Map },
  // ];

  return {
    user,
    // teams,
    // navMain:
    // userRole === "admin"
    //   ? [...commonNavMain, ...adminNavMain]
    //   :
    // commonNavMain,
    managements:
      // userRole === "admin"
      //   ? [...commonProjects, ...adminProjects]
      //   :
      managements,
  };
};

interface AppSidebarProps {
  userRole: Role;
}
export function AppSidebar({ userRole, ...props }: AppSidebarProps) {
  const data = getSidebarData(userRole);

  return (
    <Sidebar
      collapsible="icon"
      className="w-64 bg-background border-r"
      {...props}
    >
      <SidebarHeader className="p-4 border-b">
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain
          items={data.navMain.map((item) => ({
            ...item,
            url: item.url,
            items: item.items.map((subItem) => ({
              ...subItem,
              url: subItem.url,
            })),
          }))}
        /> */}
        {/* <NavProjects
          projects={data.projects.map((project) => ({
            ...project,
            url: project.url,
          }))}
        /> */}
        <NavManagement
          managements={data.managements.map((item) => ({
            ...item,
            url: item.url,
          }))}
        />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
