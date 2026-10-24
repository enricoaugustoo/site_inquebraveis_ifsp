import { useEffect } from "react";
import { Link } from "react-router-dom";
import { imagemUrl, dataBR } from "../data";

export const cortar = (texto = "", n = 140) =>
  texto.length > n ? texto.slice(0, n).trimEnd() + "…" : texto;

export function usePageTitle(titulo) {
  useEffect(() => {
    document.title = titulo ? `${titulo} — Os Inquebráveis` : "Os Inquebráveis";
  }, [titulo]);
}

// "onLight" = o fundo da seção é claro (texto escuro)
export function Eyebrow({ children, onLight }) {
  return (
    <p className={`eyebrow${onLight ? " eyebrow-dark" : ""}`}>
      <span className="eyebrow-mark" /> {children}
    </p>
  );
}

export function SectionHeading({ eyebrow, title, to, linkText, onLight }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <Eyebrow onLight={onLight}>{eyebrow}</Eyebrow>}
        <h2>{title}</h2>
      </div>
      {to && (
        <Link className={`text-link${onLight ? "" : " text-link-light"}`} to={to}>
          {linkText} <span>→</span>
        </Link>
      )}
    </div>
  );
}

export function PageHead({ eyebrow, title, lead, children }) {
  return (
    <section className="page-head">
      <div className="hero-grid" />
      <div className="container page-head-inner">
        <div>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1>{title}</h1>
          {lead && <p className="page-lead">{lead}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

export function Empty({ children, dark }) {
  return <div className={`empty-state${dark ? " empty-state-dark" : ""}`}>{children}</div>;
}

export function Avatar({ pessoa, grande }) {
  const foto = imagemUrl(pessoa.foto);
  return (
    <div className={`person-avatar${grande ? " person-avatar-lg" : ""}`}>
      {foto ? <img src={foto} alt="" /> : pessoa.nome.slice(0, 1).toUpperCase()}
    </div>
  );
}

export function ProjectCard({ projeto, index }) {
  return (
    <Link className="project-card" to={`/projetos/${projeto.slug}`}>
      {index !== undefined && <div className="card-index">{String(index + 1).padStart(2, "0")}</div>}
      <div className="card-content">
        <span className="tag">{projeto.area}</span>
        <h3>{projeto.nome}</h3>
        {projeto.descricao && <p>{cortar(projeto.descricao, 150)}</p>}
      </div>
      <span className="card-arrow" aria-hidden="true">↗</span>
    </Link>
  );
}

export function PersonCard({ pessoa, funcao }) {
  const sub = funcao || [pessoa.cargo, pessoa.setor].filter(Boolean).join(" · ");
  return (
    <Link className="person-card" to={`/equipe/${pessoa.id}`}>
      <Avatar pessoa={pessoa} />
      <div>
        <h3>{pessoa.nome}</h3>
        {sub && <p>{sub}</p>}
      </div>
      <span aria-hidden="true">↗</span>
    </Link>
  );
}

export function CompetitionRow({ competicao }) {
  return (
    <Link className="competition-feature" to={`/competicoes/${competicao.id}`}>
      <div className="competition-year">{competicao.ano}</div>
      <div className="competition-main">
        {competicao.congresso && <span className="tag tag-outline">{competicao.categoria}</span>}
        <h3>{competicao.congresso || competicao.categoria}</h3>
      </div>
      <span className="large-arrow" aria-hidden="true">↗</span>
    </Link>
  );
}

export function NewsCard({ noticia, onLight }) {
  return (
    <Link className={`news-card${onLight ? " news-card-light" : ""}`} to={`/noticias/${noticia.slug}`}>
      <time dateTime={noticia.data}>{dataBR(noticia.data)}</time>
      <h3>{noticia.titulo}</h3>
      {noticia.resumo && <p>{noticia.resumo}</p>}
      <span className="news-arrow">Ler notícia →</span>
    </Link>
  );
}
