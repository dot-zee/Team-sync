import { ChartArea } from "lucide-react";
import { NavLink } from "react-router";

const NavigationTab = ({ title = "sexy", icon,  path }) => {
  return (
    <NavLink className={"flex p-4 gap-4"} to={path}>  
      <ChartArea size={23} />
      {title}
    </NavLink>
  );
};

export default NavigationTab;
