import { noticiasRecentes } from "../data";
import { PageHead, NewsCard, Empty, usePageTitle } from "../components/ui";

export default function Noticias() {
  usePageTitle("Notícias");
  const lista = noticiasRecentes();
  return (
    <>
      <PageHead eyebrow="Atualizações" title="Notícias" lead="O que aconteceu e o que vem por aí." />
      <section className="section section-light">
        <div className="container">
          <div className="news-grid">
            {lista.map((n) => <NewsCard key={n.slug} noticia={n} onLight />)}
            {lista.length === 0 && <Empty>Nenhuma notícia cadastrada ainda.</Empty>}
          </div>
        </div>
      </section>
    </>
  );
}
