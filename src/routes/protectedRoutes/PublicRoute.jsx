import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PublicRoute = () => {

  const {employee } = useSelector(store => store.auth)

  if(employee){
    return <Navigate to={"/home"} />
  }

  return <Outlet />
};

export default PublicRoute;
