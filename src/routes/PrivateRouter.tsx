import { Navigate, Outlet } from "react-router-dom";

function PrivateRouter() {
  const  token = localStorage.getItem('token')

  return token ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRouter;
