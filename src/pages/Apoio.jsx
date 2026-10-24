import { patrocinadores, imagemUrl } from "../data";
import { PageHead, Empty, usePageTitle } from "../components/ui";

export default function Apoio() {
  usePageTitle("Apoio");

  const listaPatrocinadores = Array.isArray(patrocinadores) ? patrocinadores.filter(Boolean) : [];
  const niveis = [];

  for (const p of listaPatrocinadores) {
    const nome = (p?.nivel || "Apoio").trim() || "Apoio";
    let grupo = niveis.find((n) => n.nome === nome);
    if (!grupo) niveis.push((grupo = { nome, itens: [] }));
    grupo.itens.push(p);
  }

  return (
    <>
      <PageHead
        eyebrow="Quem torna possível" title="Apoio"
        lead="Empresas e instituições que apoiam a equipe."
      />
      <section className="section section-light">
        <div className="container">
          {niveis.map((n) => (
            <div key={n.nome} className="group">
              <h2 className="group-title">{n.nome}</h2>
              <div className="sponsor-grid">
                {n.itens.map((p) => {
                  const caminhoLogo = p.logo
                    ? p.logo.startsWith("apoio/")
                      ? p.logo
                      : `apoio/${p.logo}`
                    : "";
                  const logo = imagemUrl(caminhoLogo);
                  const conteudo = logo
                    ? <img src={logo} alt={p.nome} />
                    : <span>{p.nome}</span>;

                  return p.site ? (
                    <a key={p.nome} className="sponsor" href={p.site} target="_blank" rel="noopener noreferrer"
                       aria-label={p.nome}>{conteudo}</a>
                  ) : (
                    <div key={p.nome} className="sponsor">{conteudo}</div>
                  );
                })}
              </div>
            </div>
          ))}
          {niveis.length === 0 && <Empty>Nenhum apoiador cadastrado ainda.</Empty>}
        </div>
      </section>
    </>
  );
}
