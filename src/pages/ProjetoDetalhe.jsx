import { Link, useParams } from "react-router-dom";
import { getProjeto, equipeDoProjeto, competicoesDoProjeto, imagemUrl } from "../data";
import { PageHead, PersonCard, Empty, usePageTitle } from "../components/ui";
import NaoEncontrado from "./NaoEncontrado";

export default function ProjetoDetalhe() {
  const { slug } = useParams();
  const projeto = getProjeto(slug);
  usePageTitle(projeto?.nome);
  if (!projeto) return <NaoEncontrado />;

  const equipe = equipeDoProjeto(projeto);
  const competicoes = competicoesDoProjeto(projeto);
  const imagem = imagemUrl(projeto.imagem);

  return (
    <>
      <PageHead eyebrow={projeto.area} title={projeto.nome} />
      <section className="section section-light">
        <div className="container detail-grid">
          <div className="detail-main">
            <Link className="text-link back-link" to="/projetos"><span>←</span> Todos os projetos</Link>
            {imagem && <img className="detail-image" src={imagem} alt={projeto.nome} />}
            <div className="prose">
              <p>{projeto.descricao}</p>
            </div>

            <h2 className="detail-title">Competições</h2>
            {competicoes.length > 0 ? (
              <ul className="link-list">
                {competicoes.map((c) => (
                  <li key={c.id}>
                    <Link to={`/competicoes/${c.id}`}>
                      <strong>{c.ano}</strong> {c.categoria}
                      <small>{c.congresso}</small>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <Empty>Este projeto ainda não foi levado a nenhuma competição.</Empty>
            )}
          </div>

          <aside className="detail-side">
            <h2 className="detail-title">Equipe do projeto</h2>
            <div className="people-stack">
              {equipe.map(({ pessoa, funcao }) => (
                <PersonCard key={pessoa.id} pessoa={pessoa} funcao={funcao} />
              ))}
              {equipe.length === 0 && <Empty>Ninguém vinculado ainda.</Empty>}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
