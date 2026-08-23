import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export const RoleBasedRoutes = ({ allowedRole }) => {
  const { employee } = useSelector((store) => store.auth);

  if (!allowedRole.includes(employee?.role)) {
    return <Navigate to={"/unauthorized"} />;
  }

  return <Outlet />;
};

export default RoleBasedRoutes;
