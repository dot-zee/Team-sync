import Home from "../features/dashboard/ui/pages/Home";
import Chats from "../features/chats/ui/pages/Chats"
import Settings from "../features/settings/ui/pages/Settings"

export const commonRoutes = [
  {
    path: "",
    element: <Home />,
  },
  {
    path: "/home/chats",
    element: <Chats/>
  },
  {
    path: "/home/settings",
    element: <Settings />
  }
];
