import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import ExibirCarros from "../pages/ExibirCarros";
import PrivateRouter from "./PrivateRouter";
import Carro from "../pages/Carro";
import Usuario from "../pages/Usuario";
import DetalheCarro from "../pages/ExibirCarros/DetalheCarro";
import CadastroCarro from "../pages/Carro/CadastroCarro";
import CadastroUsuario from "../pages/Usuario/CadastroUsuario";
import Interesses from "../pages/Interesses";
import ExibirPDF from "../pages/Interesses/document_pdf";
import RecuperarSenha from "../pages/RecuperarSenha";




export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Rotas Publicas */}
        <Route path="login" element={<Login />} />
        <Route path="recuperarsenha" index element={<RecuperarSenha />} />
        <Route path="/" element={<ExibirCarros />} />
        <Route path="exibircarros/detalhe/:id" element={<DetalheCarro />} />

        {/* Rotas Privadas */}
        <Route path="/" element={<PrivateRouter />}>
          <Route path="carros" index element={<Carro />} />
          <Route path="carros/cadastrocarro" index element={<CadastroCarro />} />
          <Route path="usuario" index element={<Usuario />} />
          <Route path="usuario/cadastrousuario" index element={<CadastroUsuario />} />
          <Route path="interesses" index element={<Interesses />} />
          <Route path="document" index element={<ExibirPDF />} />

          
        </Route>
      </Routes>
    </Router>
  );
}
