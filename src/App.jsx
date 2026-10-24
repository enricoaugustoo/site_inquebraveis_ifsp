import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Projetos from "./pages/Projetos";
import ProjetoDetalhe from "./pages/ProjetoDetalhe";
import Competicoes from "./pages/Competicoes";
import CompeticaoDetalhe from "./pages/CompeticaoDetalhe";
import Equipe from "./pages/Equipe";
import PessoaDetalhe from "./pages/PessoaDetalhe";
import Noticias from "./pages/Noticias";
import NoticiaDetalhe from "./pages/NoticiaDetalhe";
import Apoio from "./pages/Apoio";
import NaoEncontrado from "./pages/NaoEncontrado";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projetos" element={<Projetos />} />
        <Route path="projetos/:slug" element={<ProjetoDetalhe />} />
        <Route path="competicoes" element={<Competicoes />} />
        <Route path="competicoes/:id" element={<CompeticaoDetalhe />} />
        <Route path="equipe" element={<Equipe />} />
        <Route path="equipe/:id" element={<PessoaDetalhe />} />
        <Route path="noticias" element={<Noticias />} />
        <Route path="noticias/:slug" element={<NoticiaDetalhe />} />
        <Route path="apoio" element={<Apoio />} />
        <Route path="*" element={<NaoEncontrado />} />
      </Route>
    </Routes>
  );
}
