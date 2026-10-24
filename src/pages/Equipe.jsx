import { pessoas } from "../data";
import { PageHead, PersonCard, Empty, usePageTitle } from "../components/ui";

export default function Equipe() {
  usePageTitle("Equipe");
  // agrupa por setor, na ordem em que aparecem em pessoas.js
  const setores = [];
  for (const p of pessoas) {
    const nome = p.setor || "Equipe";
    let grupo = setores.find((s) => s.nome === nome);
    if (!grupo) setores.push((grupo = { nome, pessoas: [] }));
    grupo.pessoas.push(p);
  }

  return (
    <>
      <PageHead
        eyebrow="Pessoas" title="Equipe"
        lead="Quem faz a equipe acontecer. Clique em uma pessoa para ver a trajetória dela."
      />
      <section className="section section-light">
        <div className="container">
          {setores.map((s) => (
            <div key={s.nome} className="group">
              <h2 className="group-title">{s.nome}</h2>
              <div className="people-grid">
                {s.pessoas.map((p) => <PersonCard key={p.id} pessoa={p} />)}
              </div>
            </div>
          ))}
          {setores.length === 0 && <Empty>Nenhum membro cadastrado ainda.</Empty>}
        </div>
      </section>
    </>
  );
}
