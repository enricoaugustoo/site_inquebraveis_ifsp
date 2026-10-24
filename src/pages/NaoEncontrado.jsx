import { Link } from "react-router-dom";
import { PageHead, usePageTitle } from "../components/ui";

export default function NaoEncontrado() {
  usePageTitle("Página não encontrada");
  return (
    <>
      <PageHead
        eyebrow="Erro 404" title="Página não encontrada"
        lead="O endereço não existe ou o item foi removido."
      />
      <section className="section section-light">
        <div className="container">
          <Link className="btn btn-dark" to="/">Voltar ao início</Link>
        </div>
      </section>
    </>
  );
}
