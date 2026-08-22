import { ChartArea } from "lucide-react";
import { NavLink } from "react-router";

const NavigationTab = ({ path, title, }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `flex gap-3 pl-4 py-2 ${
          isActive
            ? "border-r-4 border-[var(--bg-primary)] bg-[var(--secondary)]"
            : ""
        }`
      }
      to={path}
      end="/"
    >
      <ChartArea size={23} />
      {title}
    </NavLink>
  );
};

export default NavigationTab;