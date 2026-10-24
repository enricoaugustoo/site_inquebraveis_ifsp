import { useState } from "react";
import { projetos } from "../data";
import { PageHead, ProjectCard, Empty, usePageTitle } from "../components/ui";

export default function Projetos() {
  usePageTitle("Projetos");
  const [area, setArea] = useState("");
  const areas = [...new Set(projetos.map((p) => p.area))];
  const lista = area ? projetos.filter((p) => p.area === area) : projetos;

  return (
    <>
      <PageHead
        eyebrow="O que fazemos" title="Projetos"
        lead="Tudo o que a equipe desenvolve, de estruturas a ferramentas de cálculo."
      />
      <section className="section section-light">
        <div className="container">
          {areas.length > 1 && (
            <div className="chips" role="group" aria-label="Filtrar por área">
              <button className="chip" aria-pressed={area === ""} onClick={() => setArea("")}>Todos</button>
              {areas.map((a) => (
                <button key={a} className="chip" aria-pressed={area === a} onClick={() => setArea(a)}>{a}</button>
              ))}
            </div>
          )}
          <div className="project-grid">
            {lista.map((p) => <ProjectCard key={p.slug} projeto={p} />)}
            {lista.length === 0 && <Empty>Nenhum projeto cadastrado ainda.</Empty>}
          </div>
        </div>
      </section>
    </>
  );
}
