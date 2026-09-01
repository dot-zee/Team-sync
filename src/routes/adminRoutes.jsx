import Department from "../features/admin module/department/ui/pages/Department";
import Documents from "../features/admin module/documents/ui/pages/Document";
import EmployeeManagement from "../features/admin module/employees_management/ui/pages/EmployeeManagement";
import Tasks from "../features/admin module/tasks/ui/pages/Tasks"

export const adminRoutes = [
  {
    path: "/home/department",
    element: <Department />,
  },
  {
    path: "/home/documents",
    element: <Documents />
  },
  {
    path: "/home/employees-management",
    element: <EmployeeManagement/>
  },
  {
    path: "/home/tasks",
    element: <Tasks />
  }
];
