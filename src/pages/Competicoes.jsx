import { competicoesRecentes } from "../data";
import { PageHead, CompetitionRow, Empty, usePageTitle } from "../components/ui";

export default function Competicoes() {
  usePageTitle("Competições");
  const lista = competicoesRecentes();
  return (
    <>
      <PageHead
        eyebrow="Trajetória" title="Competições"
        lead="Onde a equipe já competiu, do ano mais recente ao mais antigo."
      />
      <section className="section section-dark">
        <div className="container">
          {lista.map((c) => <CompetitionRow key={c.id} competicao={c} />)}
          {lista.length === 0 && <Empty dark>Nenhuma competição cadastrada ainda.</Empty>}
        </div>
      </section>
    </>
  );
}
