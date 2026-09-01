import { useSelector } from "react-redux";
import NavigationTab from "./NavigationTab";
import {
  adminNavigations,
  employeeNavigations,
} from "../../../../app/constants/navigations";

const AsideNav = () => {
  const { employee } = useSelector((store) => store.auth);

  let navigations =
    employee?.role === "admin" ? adminNavigations : employeeNavigations;

  return (
    <div>
      <div className="flex flex-col gap-1 p-4">
        <h1 className="text-3xl font-semibold text-[#CAB8F9]">team-sync</h1>
        <p className="text-sm text-(--text-secondary)">Enterprise workspace</p>
      </div>

      {/* THe vertical tabs */}
      {/* <NavigationTab title="chats"  path="/home/chats"  /> Now to make this dynamic we create navigations seperately and map it here  */}

      {navigations.map((val) => {
        return <NavigationTab  title={val.title} path={val.path} icon={val.icon} />;
      })}
    </div>
  );
};

export default AsideNav;
