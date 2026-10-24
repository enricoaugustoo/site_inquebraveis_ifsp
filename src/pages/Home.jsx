import { Link } from "react-router-dom";
import { projetos, pessoas, noticiasRecentes, competicoesRecentes, imagemUrl } from "../data";
import {
  Eyebrow, SectionHeading, ProjectCard, PersonCard, CompetitionRow, NewsCard, Empty, usePageTitle,
} from "../components/ui";

export default function Home() {
  usePageTitle("");
  const ultimaCompeticao = competicoesRecentes()[0];

  return (
    <>
      <section className="hero">
        <div className="hero-grid" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <Eyebrow>IFSP · Caraguatatuba</Eyebrow>
            <h1>OS<br /><span>INQUEBRÁVEIS</span></h1>
            <p className="hero-lead">
              Projetos, competições e pessoas que constroem a trajetória da equipe.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/projetos">Explorar projetos <span>↗</span></Link>
              <Link className="btn btn-ghost-light" to="/competicoes">Ver competições</Link>
            </div>
          </div>
          <div className="hero-mark" aria-hidden="true">
            <img src={imagemUrl("logomarca-equipe.png")} className="hero-logo" alt="" />
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <SectionHeading
            onLight eyebrow="O que fazemos" title="Projetos em movimento."
            to="/projetos" linkText="Todos os projetos"
          />
          <div className="project-grid">
            {projetos.slice(0, 3).map((p, i) => <ProjectCard key={p.slug} projeto={p} index={i} />)}
            {projetos.length === 0 && <Empty>Nenhum projeto cadastrado ainda.</Empty>}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <SectionHeading
            eyebrow="Trajetória" title="Competições"
            to="/competicoes" linkText="Histórico completo"
          />
          {ultimaCompeticao
            ? <CompetitionRow competicao={ultimaCompeticao} />
            : <Empty dark>Nenhuma competição cadastrada ainda.</Empty>}
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <SectionHeading
            onLight eyebrow="Pessoas" title="Quem faz acontecer."
            to="/equipe" linkText="Conhecer a equipe"
          />
          <div className="people-grid">
            {pessoas.slice(0, 4).map((p) => <PersonCard key={p.id} pessoa={p} />)}
            {pessoas.length === 0 && <Empty>Nenhum membro cadastrado ainda.</Empty>}
          </div>
        </div>
      </section>

      <section className="section news-strip">
        <div className="container">
          <SectionHeading
            eyebrow="Atualizações" title="Últimas notícias."
            to="/noticias" linkText="Todas as notícias"
          />
          <div className="news-grid">
            {noticiasRecentes().slice(0, 3).map((n) => <NewsCard key={n.slug} noticia={n} />)}
            {noticiasRecentes().length === 0 && <Empty dark>Nenhuma notícia cadastrada ainda.</Empty>}
          </div>
        </div>
      </section>
    </>
  );
}
