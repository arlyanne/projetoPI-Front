import { Navigate, Outlet } from 'react-router-dom';

function PrivateRouter() {

  const isAutenticado = !!localStorage.getItem('token');

  return (
    isAutenticado ? <Outlet/>  : <Navigate to="/exibircarros"/> 
  )
}

export default PrivateRouter