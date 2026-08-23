import Attendance from "../features/employee module/Attendance/ui/pages/Attendance";
import MyTask from "../features/employee module/MyTask/ui/pages/MyTask"
import Profile from "../features/employee module/profile/ui/pages/Profile"

export const employeeRoutes = [
  {
    path: "/home/attendance",
    element: <Attendance />,
  },
  {
    path: "/home/my-task",
    element: <MyTask />
  },
  {
    path: "/home/profile",
    element: <Profile />
  }
];
