import { Link, useParams } from "react-router-dom";
import { getPessoa, projetosDaPessoa, participacoesDaPessoa } from "../data";
import { PageHead, Avatar, Empty, usePageTitle } from "../components/ui";
import NaoEncontrado from "./NaoEncontrado";

export default function PessoaDetalhe() {
  const { id } = useParams();
  const pessoa = getPessoa(id);
  usePageTitle(pessoa?.nome);
  if (!pessoa) return <NaoEncontrado />;

  const projetos = projetosDaPessoa(pessoa.id);
  const participacoes = participacoesDaPessoa(pessoa.id);
  const links = [
    ["LinkedIn", pessoa.linkedin],
    ["GitHub", pessoa.github],
    ["Currículo Lattes", pessoa.lattes],
    ["Portfólio", pessoa.portfolio],
  ].filter(([, url]) => url);

  return (
    <>
      <PageHead
        eyebrow={[pessoa.cargo, pessoa.setor].filter(Boolean).join(" · ")}
        title={pessoa.nome}
      >
        <Avatar pessoa={pessoa} grande />
      </PageHead>

      <section className="section section-light">
        <div className="container detail-grid">
          <div className="detail-main">
            <Link className="text-link back-link" to="/equipe"><span>←</span> Toda a equipe</Link>

            {pessoa.resumo && <div className="prose"><p>{pessoa.resumo}</p></div>}

            {(links.length > 0 || pessoa.email) && (
              <div className="link-buttons">
                {links.map(([texto, url]) => (
                  <a key={texto} className="btn btn-dark" href={url} target="_blank" rel="noopener noreferrer">
                    {texto} <span>↗</span>
                  </a>
                ))}
                {pessoa.email && (
                  <a className="btn btn-outline" href={`mailto:${pessoa.email}`}>{pessoa.email}</a>
                )}
              </div>
            )}
          </div>

          <aside className="detail-side">
            <h2 className="detail-title">Trajetória</h2>
            {projetos.length > 0 || participacoes.length > 0 ? (
              <ul className="tree">
                {projetos.map(({ projeto, funcao, competicoes }) => (
                  <li key={projeto.slug}>
                    <Link to={`/projetos/${projeto.slug}`}>{projeto.nome}</Link>
                    {funcao && <small>{funcao}</small>}
                    {competicoes.length > 0 && (
                      <ul className="tree-sub">
                        {competicoes.map((c) => (
                          <li key={c.id}>
                            <Link to={`/competicoes/${c.id}`}>{c.categoria} {c.ano}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
                {participacoes.map(({ competicao, funcao }) => (
                  <li key={competicao.id}>
                    <Link to={`/competicoes/${competicao.id}`}>{competicao.categoria} {competicao.ano}</Link>
                    {funcao && <small>{funcao}</small>}
                  </li>
                ))}
              </ul>
            ) : (
              <Empty>Nenhum projeto ou competição vinculado ainda.</Empty>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
