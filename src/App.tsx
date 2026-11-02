import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Integrantes from "./pages/Integrantes";
import Faq from "./pages/Faq";
import Contato from "./pages/Contato";
import Plataforma from "./pages/Plataforma";
import Ranking from "./pages/Ranking";
import Validar from "./pages/Validar";
import Usuarios from "./pages/Usuarios";
import UsuarioDetalhe from "./pages/UsuarioDetalhe";
import VideoDetalhe from "./pages/VideoDetalhe";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/plataforma" element={<Plataforma />} />
          <Route path="/validar" element={<Validar />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/usuarios" element={<Usuarios />} />
          {/* rotas com parâmetro: o :id é lido com useParams */}
          <Route path="/usuarios/:id" element={<UsuarioDetalhe />} />
          <Route path="/videos/:id" element={<VideoDetalhe />} />
          <Route path="/integrantes" element={<Integrantes />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contato" element={<Contato />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
