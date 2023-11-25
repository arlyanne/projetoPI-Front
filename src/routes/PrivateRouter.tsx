import { useAtomValue } from "jotai";
import { Navigate, Outlet } from "react-router-dom";
import { authAtom } from "../atom";

function PrivateRouter() {
  const { isAuth } = useAtomValue(authAtom);

  return isAuth ? <Outlet /> : <Navigate to="/exibircarros" />;
}

export default PrivateRouter;
