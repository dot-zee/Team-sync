import {
  Book,
  Building,
  LayoutDashboard,
  Notebook,
  NotebookTabs,
  PersonStanding,
  Settings,
  User,
} from "lucide-react";
import { Profiler } from "react";

export const employeeNavigations = [
  {
    path: "/home",
    title: "Dashboard",
    icon: <LayoutDashboard />,
  },
  {
    path: "/chats",
    title: "Chats",
    icon: <MessageChannel />,
  },
  {
    path: "/settings",
    title: "Settings",
    icon: <Settings />,
  },
  {
    path: "/home/attendance",
    title: "Attendance",
    icon: <PersonStanding />,
  },
  {
    path: "/home/my-task",
    title: "My Task",
    icon: <Notebook />,
  },
  {
    path: "/home/profile",
    title: "Profile",
    icon: <Profiler />,
  },
];

export const adminNavigations = [
  {
    path: "/home",
    title: "Dashboard",
    icon: <LayoutDashboard />,
  },
  {
    path: "/home/chats",
    title: "Chats",
    icon: <MessageChannel />,
  },
  {
    path: "/home/settings",
    title: "Settings",
    icon: <Settings />,
  },
  {
    path: "/home/department",
    title: "Department",
    icon: <Building />,
  },
  {
    path: "/home/tasks",
    title: "Tasks",
    icon: <NotebookTabs />,
  },
  {
    path: "/home/employees-management",
    title: "Employees",
    icon: <User />,
  },
  {
    path: "/home/documents",
    title: "Documents",
    icon: <Book />,
  },
];
