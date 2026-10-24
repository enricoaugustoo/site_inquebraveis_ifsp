import { Link, useParams } from "react-router-dom";
import { getCompeticao, projetosDaCompeticao, equipeDaCompeticao } from "../data";
import { PageHead, ProjectCard, PersonCard, Empty, usePageTitle } from "../components/ui";
import NaoEncontrado from "./NaoEncontrado";

export default function CompeticaoDetalhe() {
  const { id } = useParams();
  const competicao = getCompeticao(id);
  usePageTitle(competicao && `${competicao.categoria} ${competicao.ano}`);
  if (!competicao) return <NaoEncontrado />;

  const projetos = projetosDaCompeticao(competicao.id);
  const equipe = equipeDaCompeticao(competicao);

  return (
    <>
      <PageHead
        eyebrow={[competicao.ano, competicao.congresso].filter(Boolean).join(" · ")}
        title={competicao.categoria}
        lead={competicao.descricao}
      />
      <section className="section section-light">
        <div className="container">
          <Link className="text-link back-link" to="/competicoes"><span>←</span> Todas as competições</Link>

          {competicao.resultado && (
            <p className="result-box"><strong>Resultado</strong> {competicao.resultado}</p>
          )}

          <h2 className="detail-title">Projetos apresentados</h2>
          <div className="project-grid">
            {projetos.map((p) => <ProjectCard key={p.slug} projeto={p} />)}
            {projetos.length === 0 && <Empty>Nenhum projeto vinculado ainda.</Empty>}
          </div>

          {equipe.length > 0 && (
            <>
              <h2 className="detail-title">Equipe</h2>
              <div className="people-grid">
                {equipe.map(({ pessoa, funcao }) => (
                  <PersonCard key={pessoa.id} pessoa={pessoa} funcao={funcao} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
